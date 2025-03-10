import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import './App.css';

function Location() {
  const [location, setLocation] = useState([])
  const [stored_user, setStoredUser] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get('https://ghaacademy.com.ng/location').then(res => setLocation(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      if (confirmDelete()){
      await axios.delete('https://ghaacademy.com.ng/location/'+id)
      window.location.reload()
      }
    }catch(err) {
      console.log(err)
    }

  }
  const confirmDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    return isConfirmed
  }

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
    
    {stored_user && stored_user.role !== "User" && (
      <Container>
      <h5 className='mt-4'>Locations List</h5>
          

          <Link to='/location/createLocation' className='btn success'>Add +</Link>
          <Form>
              <InputGroup className='my-3' style={{ width: '96%'}}>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Location' />
              </InputGroup>

            </Form>
            
            <div style={{ width: '96%', height: '400px', overflow: 'auto' }}>
          <Table  striped bordered   style={{ fontSize: '14px'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  location.filter((data) => {
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
                      <ButtonGroup>
                      <Link to={`updateLocation/${data.id}`} className='btn btn-light btn-sm'>Update</Link>
                      <Dropdown >
                        <Dropdown.Toggle split variant="light" className='btn-sm' id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={e => handleDelete(data.id)}>Delete</Dropdown.Item>
                         
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                    </tr>
                  ))
                  }

              </tbody>

          </Table>
          </div>
        </Container>
    ) || (<p>Sorry, current user has no access to this page</p>)
    }
      </div>

  )
}

export default Location