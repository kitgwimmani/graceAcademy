import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

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
    const [supply_date, setSupplyDate] = useState('');
    const navigate = useNavigate();

    const [allProducts, setAllProducts] = useState([]);
    const [allSupplier, setAllSupplier] = useState([]);
    const [allUnit, setAllUnit] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/product').then(res => setAllProducts(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/supplier').then(res => setAllSupplier(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/unit').then(res => setAllUnit(res.data))
            .catch(err => console.log(err));
    }, [])


    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        navigate('/product/createProduct');
    };

    const handleAddSupplier = (event) => {
        event.preventDefault();
        navigate('/supplier/createSupplier');
    };

    const handleAddUnit = (event) => {
        event.preventDefault();
        navigate('/unit/createUnit');
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createSupply', { product, supplier, unit, quantity, expiry_date, serial_number, isbn, barcode, remark, supply_date }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Supply</h2>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                        <div className='row'> 
                        <div className='col-9'>
                                <label htmlFor='product'>Item</label>
                                <select
                                    id='product'
                                    className='form-control'
                                    value={product}
                                    required
                                    onChange={(e) => setProduct(e.target.value)}
                                >
                                    <option value='' disabled>Select Item</option>
                                    {allProducts.map((allProducts) => (
                                        <option key={allProducts.id} value={allProducts.id}>
                                            {allProducts.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-3'>
                                <label>If none</label>
                                <button className='btn btn-success' onClick={handleAddProduct}>new</button>
                                </div>
                            </div>
                        </div>

                        <div className='mb-2 col-6'>
                        <div className='row'> 
                            <div className='col-9'>
                                <label htmlFor='supplier'>Supplier</label>
                                <select
                                    id='supplier'
                                    className='form-control'
                                    value={supplier}
                                    required
                                    onChange={(e) => setSupplier(e.target.value)}
                                >
                                    <option value='' disabled>Select Supplier</option>
                                    {allSupplier.map((allSupplier) => (
                                        <option key={allSupplier.id} value={allSupplier.id}>
                                            {allSupplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>If none</label>
                                <button className='btn btn-success' onClick={handleAddSupplier}>new</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <div className='row'> 
                                <div className='col-9'>
                                    <label htmlFor='unit'>Unit</label>
                                    <select
                                        id='unit'
                                        className='form-control'
                                        value={unit}
                                        required
                                        onChange={(e) => setUnit(e.target.value)}
                                    >
                                        <option value='' disabled>Select Unit</option>
                                        {allUnit.map((allUnit) => (
                                            <option key={allUnit.id} value={allUnit.id}>
                                                {allUnit.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-3'>
                                <label>If none</label>
                                <button className='btn btn-success' onClick={handleAddUnit}>new</button>
                                </div>
                            </div>
                        
                    </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Quantity</label>
                            <input type='number' 
                                placeholder='Enter Quantity' 
                                required
                                className='form-control'
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Expiration Date</label>
                            <input type='date' 
                                placeholder='Enter Expiration Date' 
                                className='form-control'
                                onChange={e => setExpiryDate(e.target.value)}
                            />
                        </div>


                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Serial Number</label>
                            <input type='text' 
                                placeholder='Enter Serial Number' 
                                className='form-control'
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
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Remark</label>
                            <textarea
                                placeholder='Enter Remark'
                                className='form-control'
                                onChange={e => setRemark(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Supply Date</label>
                            <input type='date' 
                                placeholder='Enter Supply Date' 
                                required
                                className='form-control'
                                onChange={e => setSupplyDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <ButtonGroup>
                        <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                        <button className='btn btn-success'>Submit</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}

export default CreateSupply