import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import '../App.css';
//import '../Table.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    axios.get('http://localhost:8081/inventory/').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedInventory = [...inventory].sort((a, b) => {
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


  return (
    <div className='main-content'>
      <Container>
          <h5 className='mt-4'>Stock Report</h5>
          
            <Form>
              <InputGroup className='my-3'>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Inventory' />
              </InputGroup>

            </Form>
            <Table  bordered  style={{ fontSize: '12px' }}>
              <thead>
              <tr>
          <th onClick={() => handleSort('date')} >Date</th>
          <th onClick={() => handleSort('item')}>Item</th>
          <th onClick={() => handleSort('category')}>Category</th>
          <th onClick={() => handleSort('supplier')}>Supplier</th>
          <th onClick={() => handleSort('unit')}>Unit</th>
          <th onClick={() => handleSort('quantity')}>Quantity</th>
          <th onClick={() => handleSort('expiration_date')}>Expiration Date</th>
          <th onClick={() => handleSort('isbn')}>ISBN</th>
          <th onClick={() => handleSort('serial_number')}>Serial Number</th>
          <th onClick={() => handleSort('barcode')}>Barcode</th>
          <th onClick={() => handleSort('remark')}>Remark</th>
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

export default Inventory