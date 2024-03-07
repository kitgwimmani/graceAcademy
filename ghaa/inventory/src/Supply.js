import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Supply() {
  const [supply, setSupply] = useState([])
  useEffect(()=>{
    axios.get('https://graceaaapi.cloudsync.com.ng/supply').then(res => setSupply(res.data))
    .catch(err => console.log(err));
  }, [])

  const [allProducts, setAllProducts] = useState([]);
    const [allSupplier, setAllSupplier] = useState([]);
    const [allUnit, setAllUnit] = useState([]);
  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/product').then(res => setAllProducts(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/supplier').then(res => setAllSupplier(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/unit').then(res => setAllUnit(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleDelete = async(id) => {
    try{
      await axios.delete('https://graceaaapi.cloudsync.com.ng/supply/'+id)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }

  }

  const fontSize = '12px';

  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
          <Link to='/supply/createSupply' className='btn btn-success'>Add New Stock +</Link>
          <table className='table' style={{fontSize}}>
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
                </tr>
              </thead>
              <tbody>
                {
                  supply.map((data, i) => (
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