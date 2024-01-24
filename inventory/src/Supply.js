import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Supply() {
  const [supply, setSupply] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/supply').then(res => setSupply(res.data))
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

  const fontSize = '12px';

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/supply/createSupply' className='btn btn-success'>Add +</Link>
          <table className='table' style={{fontSize}}>
              <thead>
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {
                  supply.map((data, i) => (
                    <tr key={i}>
                      <td>{data.product}</td>
                      <td>{data.supplier}</td>
                      <td>{data.unit}</td>
                      <td>{data.quantity}</td>
                      <td>{data.expiry_date}</td>
                      <td>{data.serial_number}</td>
                      <td>{data.isbn}</td>
                      <td>{data.barcode}</td>
                      <td>{data.remark}</td>
                      <td><Link to={`updateSupply/${data.id}`} className='btn btn-primary btn-sm'>Update</Link></td>
                      <td><button className='btn btn-danger ms-2 btn-sm' onClick={ e => handleDelete(data.id)}>Delete</button></td>
                    </tr>
                  ))
                  }

              </tbody>

          </table>
        
      </div>

    </div>
  )
}

export default Supply