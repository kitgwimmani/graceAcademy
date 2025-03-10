import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Button } from 'react-bootstrap';
import '../App.css';
//import '../Table.css';

function Expiration() {
  const [expiration, setExpiration] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/expiration_status/').then(res => setExpiration(res.data))
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

  const sortedInventory = [...expiration].sort((a, b) => {
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
          <h5 className='mt-4'>Expired Items</h5>
          
            <Form>
              <InputGroup className='my-3'>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Inventory' />
              </InputGroup>

            </Form>
            <Table striped bordered hover style={{ fontSize: '12px' }}>
              <thead>
              <tr>
          <th onClick={() => handleSort('product')}>Item</th>
          <th onClick={() => handleSort('quantity')}>Quantity</th>
          <th onClick={() => handleSort('expiration_date')}>Expiration Date</th>
          <th onClick={() => handleSort('Details')}>Remark</th>
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
                    <td>
                    <NavLink to={`/supply/manageSupply/${data.id}`} >
                      {data.product}
                    </NavLink>
                    </td>
                      <td>{data.quantity}</td>
                      <td>{new Date(data.expiry_date).toLocaleDateString()}</td>
                      <td> <NavLink to={`/supply/manageSupply/${data.id}`}ton className='btn btn-sm btn-secondary'>View Details</NavLink> </td>
                      
                    </tr>
                  ))
                }

              </tbody>

            </Table>
            </Container>
        </div>
        
      
  )
}

export default Expiration