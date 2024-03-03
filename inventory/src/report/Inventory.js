import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import '../App.css';
//import '../Table.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8081/inventory/').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])


  return (
    <div className='main-content'>
      <Container>
          <Link to='/dashboard' className='btn btn-secondary'>Dashboard</Link>
          
            <Form>
              <InputGroup className='my-3'>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Inventory' />
              </InputGroup>

            </Form>
            <Table striped bordered hover style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Expiration Date</th>
                  <th>ISBN</th>
                  <th>Serial Number</th>
                  <th>Barcode</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
              
                {
                  inventory.filter((data) => {
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