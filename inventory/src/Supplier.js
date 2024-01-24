import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Supplier() {
  const [supplier, setSupplier] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/supplier').then(res => setSupplier(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      await axios.delete('http://localhost:8081/supplier/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

 

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/supplier/createSupplier' className='btn btn-success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  supplier.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.phone}</td>
                      <td><Link to={`updateSupplier/${data.id}`} className='btn btn-primary'>Update</Link></td>
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

export default Supplier