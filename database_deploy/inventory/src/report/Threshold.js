import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Button } from 'react-bootstrap';
import '../App.css';
//import '../Table.css';

function Threshold() {
  const [threshold, setThreshold] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    axios.get('http://localhost:8081/stock_level/').then(res => setThreshold(res.data))
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

  const sortedInventory = [...threshold].sort((a, b) => {
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
        <h5 className='mt-4'>Low stock levels</h5>

        <Form>
          <InputGroup className='my-3'>
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Items' />
          </InputGroup>

        </Form>
        <Table striped bordered hover style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Item</th>
              <th onClick={() => handleSort('quantity')}>Quantity</th>
              <th onClick={() => handleSort('threashold')}>Threshold</th>
              <th onClick={() => handleSort('above')}>Quantity Below</th>
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
                  <td>
                    <NavLink to={`/supply/manageSupply/${data.id}`} >
                      {data.name}
                    </NavLink>
                  </td>
                  <td>{data.quantity}</td>
                  <td>{data.threshold}</td>
                  <td>{data.quantity_below}</td>
                  <td><a href={data.reorder_url}>{data.reorder_url}</a> </td>
                </tr>
              ))
            }

          </tbody>

        </Table>
      </Container>
    </div>


  )
}

export default Threshold