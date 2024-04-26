import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Pagination } from 'react-bootstrap';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import './App.css';

function Supply() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/category').then(res => setAllCategory(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleDelete = async (id) => {
    try {
      if (confirmDelete()) {
        await axios.delete('http://localhost:8081/supply/' + id)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }

  }

  const confirmDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    return isConfirmed
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedProduct = [...product].sort((a, b) => {
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
    <div className='row'>
    <div className='col-10'>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Item' />
        </InputGroup>
      </Form>
      </div>
      <div className='my-3 col-2'>
      <Link to='/product/createProduct' className='btn success'>Add New Item</Link>
      </div>
    </div>
    <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
        <Table striped bordered hover style={{ fontSize: '12px' }}>

          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('category')}>Category</th>
              <th onClick={() => handleSort('consumable')}>Consumable</th>
              <th onClick={() => handleSort('traceable')}>Traceable</th>
              <th onClick={() => handleSort('description')}>Description</th>
              <th onClick={() => handleSort('expiration')}>Can Expire</th>
              <th onClick={() => handleSort('threshold')}>Threshold</th>
              <th onClick={() => handleSort('serial_number')}>Serial Number</th>
              <th onClick={() => handleSort('isbn')}>ISBN</th>
              <th onClick={() => handleSort('subject')}>Subject</th>
              <th onClick={() => handleSort('pub_brand')}>Publisher/Brand</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedProduct.filter((data) => {
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
                  <td>{data.consumable ? 'Yes' : 'No'}</td>
                  <td>{data.traceable ? 'Yes' : 'No'}</td>
                  <td>{data.description}</td>
                  <td>{data.expiration ? 'Yes' : 'No'}</td>
                  <td>{data.threshold}</td>
                  <td>{data.serial_number}</td>
                  <td>{data.isbn}</td>
                  <td>{data.subject}</td>
                  <td>{data.pub_brand}</td>
                  
                  <td>
                    <td><Link to={`./createSupply/${data.id}`} className='btn success btn-sm'>+Stock</Link></td>
                  </td>
                  <td>
                    <td><Link to={`./manageSupply/${data.id}`} className='btn secondary btn-sm'>Manage</Link></td>
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

export default Supply

