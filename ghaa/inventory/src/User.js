import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import './App.css';

function User() {
  const [user, setUser] = useState([]);
  useEffect(()=>{
    axios.get('https://graceaaapi.cloudsync.com.ng/').then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      await axios.delete('https://graceaaapi.cloudsync.com.ng/user/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }


  return (
    <div className='main-content'>
    <div className=' d-flex vh-100 p-0 m-0  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/createUser' className='btn btn-success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Action</th>
                  <th>Manage Roles</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td><Link to={`updateUser/${data.id}`} className='btn btn-primary'>Update</Link></td>
                      <td><button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Delete</button></td>
                      <td><button 
                        className='btn btn-secondary' 
                        
                        >
                        {data.status? 'Active' : 'Inactive'}
                      </button></td>
                    </tr>
                  ))
                  }

              </tbody>

          </table>
        
      </div>
    </div>
    
    </div>
  )
}

export default User