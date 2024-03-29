import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Location() {
  const [location, setLocation] = useState([])
  useEffect(()=>{
    axios.get('https://graceaaapi.cloudsync.com.ng/location').then(res => setLocation(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      await axios.delete('https://graceaaapi.cloudsync.com.ng/location/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

 

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/location/createLocation' className='btn btn-success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  location.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td><Link to={`updateLocation/${data.id}`} className='btn btn-primary'>Update</Link></td>
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

export default Location