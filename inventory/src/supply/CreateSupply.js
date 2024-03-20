import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import Barcode from 'react-barcode';


import Select from 'react-select';
import '../App.css';

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
    const { id } = useParams();
    const navigate = useNavigate();

    const [current_product, setCurrentProduct] = useState([]);
    const [allSuppliers, setAllSupplier] = useState([]);
    const [allUnits, setAllUnit] = useState([]);

    

    useEffect(() => {
        axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/getProduct/${id}`).then(res => {
            const userData = res.data;
            setCurrentProduct(userData[0]);

        })
        .catch(err => console.log(err));
}, [id]);

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
   

   
    //##############################

    ////for searcheable supply
    const supplierOptions = allSuppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name + " ("+ supplier.phone + ")",
    }));

    const handleSupplierChange = (selectedOption) => {
        setSupplier(selectedOption ? selectedOption.value : '');
    };
    //##############################

    ////for searcheable unit
    const unitOptions = allUnits.map((unit) => ({
        value: unit.id,
        label: unit.name,
    }));

    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption ? selectedOption.value : '');
    };
    //##############################
    
    

    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Stock</h2>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <div className='row'>
                                <div className='col-10'>
                                <label htmlFor=''>Item</label>
                            <input type='text' placeholder='Enter Item' 
                            className='form-control prefill'
                                value={current_product.name}
                                readOnly
                                onChange={e => setIsbn(e.target.value)}
                            />
                                    
                                </div>

                                <div className='col-2'>
                                <br></br>
                                    <button className='btn success' onClick={handleAddProduct}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className='mb-2 col-6'>
                            <div className='row'>
                                <div className='col-10'>
                                    <label htmlFor='supplier'>Supplier</label>
                                    <Select
                                        options={supplierOptions}
                                        value={supplierOptions.find((option) => option.value === supplier)}
                                        onChange={handleSupplierChange}
                                    />
                                        
                                </div>
                                <div className='col-2'>
                                    <br></br>
                                    <button className='btn success' onClick={handleAddSupplier}>+</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <div className='row'>
                                <div className='col-10'>
                                    <label htmlFor='unit'>Unit</label>
                                    <Select
                                        options={unitOptions}
                                        value={unitOptions.find((option) => option.value === unit)}
                                        onChange={handleUnitChange}
                                    />
                                </div>
                                <div className='col-2'>
                                <br></br>
                                    <button className='btn success' onClick={handleAddUnit}>+</button>
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
                                placeholder=''
                                className='form-control prefill'
                                value={current_product.serial_number}
                                readOnly
                                onChange={e => setSerialNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>ISBN</label>
                            <input type='text' placeholder='' 
                                className='form-control prefill'
                                value={current_product.isbn}
                                readOnly
                                onChange={e => setIsbn(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Barcode</label>
                            <Barcode value={current_product.barcode} />
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
                        <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                        <button className='btn success'>Submit</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}

export default CreateSupply