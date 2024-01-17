import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function User() {
  const [user, setUser] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/').then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, [])


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
          <Link to='/createUser' className='btn btn-success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Action</th>
                  <th>Revoke</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td><button className='btn btn-primary'>Update</button></td>
                      <td><button className='btn btn-danger'>Delete</button></td>
                      <td><button className='btn btn-secondary'>Active</button></td>
                    </tr>
                  ))
                  }

              </tbody>

          </table>
        
      </div>

    </div>
  )
}

export default User