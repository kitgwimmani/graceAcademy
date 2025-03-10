import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Pagination } from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import './App.css';

function Supply() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/category').then(res => setAllCategory(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleDelete = async (id) => {
    try {
      if (confirmDelete()) {
        await axios.delete('https://ghaacademy.com.ng/supply/' + id)
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
    <h5 className='mt-4'>Inventory</h5>
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
    <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <Table striped bordered hover style={{ fontSize: '12px' }}>

          <thead>
            <tr>
              <th onClick={() => handleSort('name')}><FaSort /> Name</th>
              <th onClick={() => handleSort('category')}><FaSort /> Category</th>
              <th onClick={() => handleSort('consumable')}><FaSort /> Consumable</th>
              <th onClick={() => handleSort('traceable')}><FaSort /> Traceable</th>
              <th onClick={() => handleSort('description')}><FaSort /> Description</th>
              <th onClick={() => handleSort('expiration')}><FaSort /> Can Expire</th>
              <th onClick={() => handleSort('threshold')}><FaSort /> Threshold</th>
              <th onClick={() => handleSort('serial_number')}><FaSort /> Serial No.</th>
              <th onClick={() => handleSort('isbn')}><FaSort /> ISBN</th>
              <th onClick={() => handleSort('subject')}><FaSort /> Subject</th>
              <th onClick={() => handleSort('pub_brand')}><FaSort /> Publisher</th>
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
                <td>
                    <NavLink to={`/supply/manageSupply/${data.id}`} >
                      {data.name}
                    </NavLink>
                  </td>
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

