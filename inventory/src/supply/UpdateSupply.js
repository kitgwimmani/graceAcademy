import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSupply() {
    const [product, setProduct] = useState('');
    const [supplier, setSupplier] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [barcode, setBarcode] = useState('');
    const [remark, setRemark] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getSupply/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setProduct(userData[0].product);
                    setSupplier(userData[0].supplier);
                    setUnit(userData[0].unit);
                    setQuantity(userData[0].quantity);
                    setExpiryDate(userData[0].expiry_date);
                    setSerialNumber(userData[0].serial_number);
                    setIsbn(userData[0].isbn);
                    setBarcode(userData[0].barcode);
                    setRemark(userData[0].remark);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateSupply/'+id, {product, supplier, unit, quantity, expiry_date,serial_number,isbn,barcode,remark}).then(res => {
            console.log(res);
            navigate('/supply');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Supply</h2>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='product'>Product</label>
                        <select
                            id='product'
                            className='form-control'
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value='' disabled>Select Product</option>
                            <option value='1'>Books.. </option>
                            <option value='2'>Table..</option>
                        </select>
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor='supplier'>Supplier</label>
                        <select
                            id='supplier'
                            className='form-control'
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                        >
                            <option value='' disabled>Select Supplier</option>
                            <option value='1'>GTBank </option>
                            <option value='2'>Green Gardens</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='unit'>Unit</label>
                        <select
                            id='unit'
                            className='form-control'
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option value='' disabled>Select Unit</option>
                            <option value='1'>Packet</option>
                            <option value='2'>Roll</option>
                        </select>
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Quantity</label>
                        <input type='number' placeholder='Enter Quantity' 
                            value={quantity}
                            className='form-control'
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Expiration Date</label>
                        <input type='date' placeholder='Enter Expiration Date' 
                            value={expiry_date}
                            className='form-control'
                            onChange={e => setExpiryDate(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Serial Number</label>
                        <input type='text' placeholder='Enter Serial Number' 
                            value={serial_number}
                            className='form-control'
                            onChange={e => setSerialNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>ISBN</label>
                        <input type='text' placeholder='Enter ISBN' 
                            value={isbn}
                            className='form-control'
                            onChange={e => setIsbn(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Barcode</label>
                        <input type='text' placeholder='Enter Barcode' 
                            value={barcode}
                            className='form-control'
                            onChange={e => setBarcode(e.target.value)}
                        />
                    </div>
                </div>

                    <div className='mb-2'>
                    <label htmlFor=''>Remark</label>
                    <textarea
                        placeholder='Enter Remark'
                        className='form-control'
                        value={remark}
                        onChange={e => setRemark(e.target.value)}
                    />
                </div>

                
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateSupply