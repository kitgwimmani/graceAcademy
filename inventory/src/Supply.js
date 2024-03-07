import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table, Pagination  } from 'react-bootstrap';

function Supply() {
  const [supply, setSupply] = useState([])
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:8081/supply').then(res => setSupply(res.data))
    .catch(err => console.log(err));
  }, [])

  const [allProducts, setAllProducts] = useState([]);
    const [allSupplier, setAllSupplier] = useState([]);
    const [allUnit, setAllUnit] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/product').then(res => setAllProducts(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/supplier').then(res => setAllSupplier(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/unit').then(res => setAllUnit(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleDelete = async(id) => {
    try{
      await axios.delete('http://localhost:8081/supply/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

  const PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSupply = supply.filter((data) => {
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
  const currentItems = filteredSupply.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSupply.length / PageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid>
      <Form>
              <InputGroup className='my-3'>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Inventory' />
              </InputGroup>

            </Form>
          <Link to='/supply/createSupply' className='btn btn-success'>Not Found? Add +</Link>
          <div>
          <Table striped bordered hover style={{ fontSize: '12px', marginBottom: '20px' }}>
         
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Supplier</th>
                  <th>unit</th>
                  <th>quantity</th>
                  <th>Expiration Date</th>
                  <th>Serial Number</th>
                  <th>ISBN</th>
                  <th>Barcode</th>
                  <th>Remark</th>
                  <th>Action</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((data, i) => (
                    <tr key={i}>
                      <td>{data.supply_date}</td>
                      <td>{allProducts.find(allProducts => allProducts.id === data.product)?.name || 'Product Not Found'}</td>
                      <td>{allSupplier.find(allSupplier => allSupplier.id === data.supplier)?.name || 'Supplier Not Found'}</td>
                      <td>{allUnit.find(allUnit => allUnit.id === data.unit)?.name || 'Unit Not Found'}</td>
                      <td>{data.quantity}</td>
                      <td>{data.expiry_date}</td>
                      <td>{data.serial_number}</td>
                      <td>{data.isbn}</td>
                      <td>{data.barcode}</td>
                      <td>{data.remark}</td>
                      <td><Link to={`updateSupply/${data.id}`} className='btn btn-primary btn-sm'>Edit</Link></td>
                      <td><Link to={`./createSupply/${data.id}`} className='btn btn-success btn-sm'>+Stock</Link></td>
                      <td><button className='btn btn-danger ms-2 btn-sm' onClick={ e => handleDelete(data.id)}>Delete</button></td>
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
          </Container>
  )
}

export default Supply