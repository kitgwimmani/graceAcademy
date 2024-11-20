import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Container } from 'react-bootstrap';
import Barcode from 'react-barcode';
import BarcodeScanner from '../components/BarcodeScanner';

import Select from 'react-select';
import '../App.css';

function CreateProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [consumable, setConsumable] = useState(0);
    const [traceable, setTraceable] = useState(0);
    const [description, setDescription] = useState('');
    const [expiration, setExpiration] = useState(0);
    const [threshold, setThreshold] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [barcode, setBarcode] = useState('');
    const [subject, setSubject] = useState('');
    const [pub_brand, setPubBrand] = useState('');
    const [reorder_url, setUrl] = useState('');
    const navigate = useNavigate();

    const [allCategories, setAllCategory] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8081/category').then(res => setAllCategory(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const handleGetBarcode = (event) => {
        alert('get your device ready')
    };

    const handleAddCategory = (event) => {
        event.preventDefault();
        navigate('/category/createCategory');
    };

    function handleSubmit(event) {
        event.preventDefault();
        //alert(consumable)
        axios.post('http://localhost:8081/createProduct', { name, category, consumable, traceable, description, expiration, threshold, serial_number, isbn, barcode, subject, pub_brand, reorder_url }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
    ////for searcheable category
    const categoryOptions = allCategories.map((category) => ({
        value: category.id,
        label: category.name
    }));

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption ? selectedOption.value : '');
    };
    //##############################
    return (
        <div className='main-content'>
            <Container>
                <form onSubmit={handleSubmit} >
                    <h2>Add Item to Inventory</h2>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''><label className='required'>* </label>Item Name</label>
                            <input type='text'
                                placeholder='Enter Item Name'
                                required
                                className='form-control'
                                onChange={e => setName(e.target.value)}
                            />

                        </div>
                        <div className='mb-2 col-6'>
                            <div className='row'>
                                <div className='mb-2 col-10'>

                                    <label htmlFor='category'> <label className='required'>* </label>Category</label>
                                    <Select
                                        required
                                        options={categoryOptions}
                                        value={categoryOptions.find((option) => option.value === category)}
                                        onChange={handleCategoryChange}
                                    />
                                </div>
                                <div className='mb-2 col-2'>
                                    <br></br>
                                    <button className='btn success' onClick={handleAddCategory}>+</button>
                                </div>


                            </div>
                        </div>

                    </div>


                    <div className='row'>
                        <div className='col-6'>

                            <div className='mb-2'>
                                <label>
                                    <input
                                        type='checkbox'
                                        className='mr-2'
                                        checked={consumable === 1} 
                                        onChange={(e) => setConsumable(e.target.checked ? 1 : 0)}
                                    />
                                    {'  '}Consumable
                                </label>
                            </div>

                            <div className='mb-2'>
                                <label>
                                    <input
                                        type='checkbox'
                                        className='mr-2'
                                        checked={traceable=== 1}
                                        onChange={(e) => setTraceable(e.target.checked ? 1 : 0)}
                                    />
                                    {'  '}Traceable
                                </label>
                            </div>
                            <div className='mb-2'>
                                <label>
                                    <input type='checkbox'
                                        className='mr-2'
                                        checked={expiration === 1}
                                        onChange={(e) => setExpiration(e.target.checked ? 1 : 0)} />
                                    {'  '}Can Expire
                                </label>
                            </div>
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''><label className='required'>* </label>Description</label>
                            <textarea
                                placeholder='Enter Description'
                                required
                                className='form-control'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                    </div>



                    <div className='row'>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Threshold</label>
                            <input type='number' placeholder='Enter Threshold' className='form-control'
                                onChange={e => setThreshold(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Serial Number</label>
                            <input type='text'
                                placeholder='Enter Serial Number'
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
                            <label htmlFor=''>Subject</label>
                            <input type='text'
                                placeholder='Enter Subject'
                                value={subject}
                                className='form-control'
                                onChange={e => setSubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Publisher/Brand</label>
                            <input type='text'
                                placeholder='Enter Publisher or Brand'
                                value={pub_brand}
                                className='form-control'
                                onChange={e => setPubBrand(e.target.value)}
                            />
                            <label htmlFor=''>Reorder URL</label>
                            <input type='text'
                                placeholder='Enter Reorder URL'
                                value={reorder_url}
                                className='form-control'
                                onChange={e => setUrl(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-3' style={{ height: '50px' }}>
                        <Barcode value={barcode || "N/A"} />
                        </div>

                        <div className="mb-2 col-3">
                            <input
                                type="text"
                                placeholder="Enter Barcode"
                                value={barcode}
                                className="form-control"
                                onChange={(e) => setBarcode(e.target.value)}
                            />
                            <BarcodeScanner />
                        </div>

                    </div>
                    <div className='row'>

                        <div className='mb-2 col-6'>
                            <ButtonGroup>
                                <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                                <button className='btn success'>Submit</button>
                            </ButtonGroup>

                        </div>
                    </div>



                </form>
            </Container>
        </div>

    )
}

export default CreateProduct