import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Pagination } from 'react-bootstrap';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import './App.css';

function Supply() {
  const [search, setSearch] = useState('');

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

  const PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProduct = product.filter((data) => {
    const searchLower = search.toLowerCase();
    return (
      searchLower === '' ||
      Object.values(data).some(
        (value) => value && value.toString().toLowerCase().includes(searchLower)
      )
    );
  });

  const indexOfLastItem = currentPage * PageSize;
  const indexOfFirstItem = indexOfLastItem - PageSize;
  const currentItems = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProduct.length / PageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Item' />
        </InputGroup>

      </Form>

      <div>
        <Table striped bordered hover style={{ fontSize: '12px', marginBottom: '20px' }}>

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
              <th>Subject</th>
              <th>Publisher/Brand</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              product.map((data, i) => (
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
                    <td><Link to={`./updateSupply/${data.id}`} className='btn secondary btn-sm'>Manage</Link></td>
                  </td>
                </tr>
              ))
            }

          </tbody>

        </Table>

        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      <Link to='/product/createProduct' className='btn success'>Add New Item</Link>
    </Container>
  )
}

export default Supply

