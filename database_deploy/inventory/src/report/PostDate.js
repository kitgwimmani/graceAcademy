import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Button } from 'react-bootstrap';
import '../App.css';
//import '../Table.css';

function PostDate() {
  const [post_date, setPostDate] = useState([])
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    axios.get('http://localhost:8081/post_date/').then(res => setPostDate(res.data))
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

  const sortedInventory = [...post_date].sort((a, b) => {
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
        <h5 className='mt-4'>Items due to be returned</h5>

        <Form>
          <InputGroup className='my-3'>
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Items' />
          </InputGroup>

        </Form>
        <Table striped bordered hover style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th onClick={() => handleSort('product')}>Item</th>
              <th onClick={() => handleSort('custodian')}>Custodian</th>
              <th onClick={() => handleSort('location')}>Location</th>
              <th onClick={() => handleSort('date_Expected')}>Date Expected</th>
              <th onClick={() => handleSort('auth_admin')}>Authorized Admin</th>
              <th>action</th>
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
                  <td>{data.custodian}</td>
                  <td>{data.location}</td>
                  <td>{new Date(data.date_expected).toLocaleDateString()}</td>
                  <td>{data.auth}</td>
                  <td> <NavLink to={`/supply/manageSupply/${data.id}`} className='btn btn-sm btn-secondary'>View Details</NavLink> </td>
                </tr>
              ))
            }

          </tbody>

        </Table>
      </Container>
    </div>


  )
}

export default PostDate