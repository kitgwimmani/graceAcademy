import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

function Product() {
  const [product, setProduct] = useState([])
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

  const fontSize = '12px';

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/product/createProduct' className='btn success'>Add +</Link>
          <table className='table' style={{fontSize}}>
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
                  product.map((data, i) => (
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
                      <Link to={`updateProduct/${data.id}`} className='btn btn-light'>Update</Link>
                      <Dropdown >
                        <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
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

          </table>
        
      </div>

    </div>
  )
}

export default Product