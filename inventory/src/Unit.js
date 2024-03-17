import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import './App.css';
function Unit() {
  const [unit, setUnit] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/unit').then(res => setUnit(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try{
      if (confirmDelete()){
      await axios.delete('http://localhost:8081/unit/'+id)
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

 

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/unit/createUnit' className='btn success'>Add +</Link>
          <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  unit.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.description}</td>
                      <td>
                      <ButtonGroup>
                      <Link to={`updateUnit/${data.id}`} className='btn btn-light'>Update</Link>
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

export default Unit