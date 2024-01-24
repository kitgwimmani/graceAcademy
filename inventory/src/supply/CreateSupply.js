import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateSupply() {
    const [product, setProduct] = useState('');
    const [supplier, setSupplier] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [barcode, setBarcode] = useState('');
    const [remark, setRemark] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createSupply', { product, supplier, unit, quantity, expiry_date, serial_number, isbn, barcode, remark }).then(res => {
            console.log(res);
            navigate('/supply');
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Supply</h2>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor='product'>Product</label>
                            <select
                                id='product'
                                className='form-control'
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
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value='' disabled>Select Unit</option>
                                <option value='1'>Packet</option>
                                <option value='2'>Roll</option>
                            </select>
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Quantity</label>
                            <input type='number' placeholder='Enter Quantity' className='form-control'
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                        <div className='row'>
                            <div className='mb-2 col-6'>
                                <label htmlFor=''>Expiration Date</label>
                                <input type='date' placeholder='Enter Expiration Date' className='form-control'
                                    onChange={e => setExpiryDate(e.target.value)}
                                />
                            </div>
                        

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Serial Number</label>
                            <input type='text' placeholder='Enter Serial Number' className='form-control'
                                onChange={e => setSerialNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>ISBN</label>
                            <input type='text' placeholder='Enter ISBN' className='form-control'
                                onChange={e => setIsbn(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Barcode</label>
                            <input type='text' placeholder='Enter Barcode' className='form-control'
                                onChange={e => setBarcode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='mb-2'>
                    <label htmlFor=''>Remark</label>
                    <textarea
                        placeholder='Enter Remark'
                        className='form-control'
                        onChange={e => setRemark(e.target.value)}
                    />
                </div>


                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateSupply