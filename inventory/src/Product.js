import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

function Product() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
    .catch(err => console.log(err));
  }, [])

  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/category').then(res => setAllCategory(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleDelete = async(id) => {
    try{
      if (confirmDelete()){
      await axios.delete('http://localhost:8081/product/'+id)
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

 

  return (
    <div className='main-content'>
       <Container>
      <h5 className='mt-4'>Items List</h5>
          <Link to='/product/createProduct' className='btn success'>Add +</Link>
          <Form>
              <InputGroup className='my-3' style={{ }}>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Product' />
              </InputGroup>

            </Form>
            <div style={{  height: '400px', overflow: 'auto' }}>
          <Table  striped bordered   style={{ fontSize: '12px'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Consumable</th>
                  <th>Traceable</th>
                  <th>Description</th>
                  <th>Can Expire</th>
                  <th>Threshold</th>
                  <th>Serial Number</th>
                  <th>ISBN</th>
                  <th>Barcode</th>
                  <th>Subject</th>
                  <th>Publisher/Brand</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.filter((data) => {
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
                      <td>{allCategory.find(allCategory => allCategory.id === data.category)?.name || 'Item Not Found'}</td>
                      <td>{data.consumable? 'Yes' : 'No'}</td>
                      <td>{data.traceable? 'Yes' : 'No'}</td>
                      <td>{data.description}</td>
                      <td>{data.expiration? 'Yes' : 'No'}</td>
                      <td>{data.threshold}</td>
                      <td>{data.serial_number}</td>
                      <td>{data.isbn}</td>
                      <td>{data.barcode}</td>
                      <td>{data.subject}</td>
                      <td>{data.pub_brand}</td>
                      <td>
                      <ButtonGroup>
                      <Link to={`updateProduct/${data.id}`} className='btn btn-light btn-sm'>Update</Link>
                      <Dropdown >
                        <Dropdown.Toggle split variant="light" className='btn-sm' id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={e => handleDelete(data.id)}>Delete</Dropdown.Item>
                         
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                      </td>
                    </tr>
                  ))
                  }

              </tbody>

          </Table>
          </div>
        </Container>
      </div>
  )
}

export default Product