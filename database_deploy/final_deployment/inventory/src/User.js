import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

import './App.css';

function User() {
  const [user, setUser] = useState([]);
  const [stored_user, setStoredUser] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/')
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirmDelete()) {
        await axios.delete(`https://ghaacademy.com.ng/user/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = () => {
    return window.confirm('Are you sure you want to delete?');
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setStoredUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, []);

  return (
    <div className='main-content'>
      {stored_user && stored_user.role === "Super" && (
        <Container>
          <h5 className='mt-4'>User List</h5>
          <Link to='/user/createUser' className='btn success'>Add +</Link>
          <Form>
            <InputGroup className='my-3' style={{ width: '100%' }}>
              <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search User' />
            </InputGroup>
          </Form>
          <div style={{ width: '100%', height: '400px', overflow: 'auto' }}>
            <Table striped bordered style={{ fontSize: '14px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user
                  .filter((data) => {
                    const searchLower = search.toLowerCase();
                    return (
                      searchLower === '' ||
                      Object.values(data).some(
                        (value) => value && value.toString().toLowerCase().includes(searchLower)
                      )
                    );
                  })
                  .map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={`updateUser/${data.id}`} className='btn btn-light btn-sm'>Update</Link>
                          <Dropdown>
                            <Dropdown.Toggle split variant="light" className='btn-sm' id="dropdown-split-basic" />
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleDelete(data.id)}>Delete</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item href="#">{data.status ? 'Activate' : 'Deactivate'}</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Container>
      )|| (<p>Sorry, current user has no access to this page</p>)}
    </div>
  );
}

export default User;
