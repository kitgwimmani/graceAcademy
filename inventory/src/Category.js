import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category() {
  const [category, setCategory] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/category').then(res => setCategory(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      await axios.delete('http://localhost:8081/category/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

 

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/category/createCategory' className='btn btn-success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  category.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.description}</td>
                      <td><Link to={`updateCategory/${data.id}`} className='btn btn-primary'>Update</Link></td>
                      <td><button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Delete</button></td>
                    </tr>
                  ))
                  }

              </tbody>

          </table>
        
      </div>

    </div>
  )
}

export default Category