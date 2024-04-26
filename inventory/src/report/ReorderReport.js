import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import Select from 'react-select';
import '../App.css';
//import '../Table.css';

function ReorderReport() {
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:8081/stock_level`)
      .then(res => setReport(res.data))
      .catch(err => console.log(err));
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedInventory = [...report].sort((a, b) => {
    if (sortBy) {
      const valA = String(a[sortBy]).toLowerCase();
      const valB = String(b[sortBy]).toLowerCase();
      if (valA < valB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const options = [
    { value: 'all', label: 'All' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'low_stock', label: 'Low Stock' },
  ];

  const handleMenuOpen = () => {
    // Reset the data when the select dropdown is clicked
    fetchData(); // This will fetch data from the server
  };

  function handleChange(selectedOption) {
   
    switch (selectedOption.value) {
      case 'out_of_stock':
        break;
      case 'low_stock':
        break;
      case 'all':
        // Fetch all data again
        fetchData();
        return;
      default:
        // Handle other options
        return;
    }

 
    // Filter the report based on the selected date range
    const filteredReport = report.filter(item => {
      return
    });
  
    // Update the report state with the filtered data
    setReport(filteredReport);
  }

  

  return (
    <div className='main-content'>
      <Container>
        <h5 className='mt-4'>Reorder Report</h5>
        <div className='row'>
          <div className='mb-2 col-3'>

            <label htmlFor='filter'>Report Period</label>
            <Select
              options={options}
              onChange={handleChange}
              placeholder="Select an option"
            />

          </div>

          
          <div className='mb-2 col-3'>
          <label htmlFor=''>Filter Report</label>
          <Form>
          <InputGroup >
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Items' />
          </InputGroup>

        </Form>
          </div>
        </div>
        
        <Table striped bordered hover style={{ fontSize: '12px' }}>
          <thead>
            <tr>
            <th onClick={() => handleSort('name')}>Item</th>
            <th onClick={() => handleSort('threshold')}>Threshold</th>
            <th onClick={() => handleSort('quantity')}>Quantity Left</th>
            <th onClick={() => handleSort('reorder_url')}>Reorder URL</th>
            </tr>
          </thead>
          <tbody>

            {
              sortedInventory.filter((data) => {
                const searchLower = search.toLowerCase();
                //specific   return search.toLowerCase()=== ''? data : data.item.toLowerCase().includes(search)
                return (
                  searchLower === '' ||
                  Object.values(data).some(
                    (value) =>
                      value && value.toString().toLowerCase().includes(searchLower)
                  )
                );
              }).map((data, i) => (
                <tr key={i}>
                <td>{data.name}</td>
                <td>{data.threshold}</td>
                  <td>{data.quantity}</td>
                  <td><a href={data.reorder_url}>{data.reorder_url}</a></td>
                </tr>
              ))
            }

          </tbody>

        </Table>
      </Container>
    </div>


  )
}

export default ReorderReport