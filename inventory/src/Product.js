import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      await axios.delete('http://localhost:8081/product/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

  const fontSize = '12px';

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/product/createProduct' className='btn btn-success'>Add +</Link>
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
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{allCategory.find(allCategory => allCategory.id === data.category)?.name || 'Product Not Found'}</td>
                      <td>{data.consumable? 'Yes' : 'No'}</td>
                      <td>{data.traceable? 'Yes' : 'No'}</td>
                      <td>{data.description}</td>
                      <td>{data.expiration? 'Yes' : 'No'}</td>
                      <td>{data.threshold}</td>
                      <td><Link to={`updateProduct/${data.id}`} className='btn btn-primary btn-sm'>Update</Link></td>
                      <td><button className='btn btn-danger btn-sm ms-2' onClick={ e => handleDelete(data.id)}>Delete</button></td>
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