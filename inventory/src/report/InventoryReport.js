import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import Select from 'react-select';
import '../App.css';
//import '../Table.css';

function InventoryReport() {
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:8081/inventory`)
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
    { value: 'all', label: 'All Time' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'this_year', label: 'This Year' },
    { value: 'custom', label: 'Custom' },
    // Add more options as needed
  ];

  const handleMenuOpen = () => {
    // Reset the data when the select dropdown is clicked
    fetchData(); // This will fetch data from the server
  };

  function handleChange(selectedOption) {
    const currentDate = new Date();
    let startDate;
    let endDate;
  
    switch (selectedOption.value) {
      case 'last_week':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 6);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        break;
      case 'this_week':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
        break;
      case 'last_month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        break;
      case 'this_month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case 'last_year':
        startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
        endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
        break;
      case 'this_year':
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
        break;
      case 'all':
        // Fetch all data again
        fetchData();
        return;
      default:
        // Handle other options
        return;
    }

    // Update the value of the input field with the start date and end date
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  document.getElementById('startDate').value = formattedStartDate;

  const formattedEndDate = endDate.toISOString().slice(0, 10);
  document.getElementById('endDate').value = formattedEndDate;
    
    // Filter the report based on the selected date range
    const filteredReport = report.filter(item => {
      const moveDate = new Date(item.date_moved);
      return moveDate >= startDate && moveDate <= endDate;
    });
  
    // Update the report state with the filtered data
    setReport(filteredReport);
  }

  function handleDateChange() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
  
    const filteredReport = report.filter(item => {
      const moveDate = new Date(item.date_moved);
      return moveDate >= startDate && moveDate <= endDate;
    });
  
    setReport(filteredReport);
  }
  

  return (
    <div className='main-content'>
      <Container>
        <h5 className='mt-4'>Location Report</h5>
        <div className='row'>
          <div className='mb-2 col-3'>

            <label htmlFor='filter'>Report Period</label>
            <Select
              options={options}
              onChange={handleChange}
              onMenuOpen={() => handleMenuOpen()}
              placeholder="Select an option"
            />

          </div>

          <div className='mb-2 col-3'>
            <label htmlFor=''>From:</label>
            <input type='date'
              className='form-control'
              id='startDate'
              onChange={handleDateChange}
              onClick={() => handleMenuOpen()}
            />
          </div>

          <div className='mb-2 col-3'>
            <label htmlFor=''>To:</label>
            <input type='date'
              className='form-control'
              id='endDate'
              onChange={handleDateChange}
              onClick={() => handleMenuOpen()}
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
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('item')}>Item</th>
              <th onClick={() => handleSort('category')}>Category</th>
              <th onClick={() => handleSort('supplier')}>Supplier</th>
              <th onClick={() => handleSort('unit')}>Unit</th>
              <th onClick={() => handleSort('quantity')}>Quantity</th>
              <th onClick={() => handleSort('expiry_date')}>Expiration Date</th>
              <th onClick={() => handleSort('isbn')}>ISBN</th>
              <th onClick={() => handleSort('serial_number')}>Serial Number</th>
              <th onClick={() => handleSort('barcode')}>Barcode</th>
              <th onClick={() => handleSort('Remark')}>Remark</th>
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
                <td>{data.date}</td>
                  <td>{data.item}</td>
                  <td>{data.category}</td>
                  <td>{data.supplier}</td>
                  <td>{data.unit}</td>
                  <td>{data.quantity}</td>
                  <td>{data.expiry_date}</td>
                  <td>{data.isbn}</td>
                  <td>{data.serial_number}</td>
                  <td>{data.barcode}</td>
                  <td>{data.remark}</td>
                </tr>
              ))
            }

          </tbody>

        </Table>
      </Container>
    </div>


  )
}

export default InventoryReport