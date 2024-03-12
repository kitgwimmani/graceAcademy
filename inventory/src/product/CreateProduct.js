import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function CreateProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [consumable, setConsumable] = useState('');
    const [traceable, setTraceable] = useState('');
    const [description, setDescription] = useState('');
    const [expiration, setExpiration] = useState('');
    const [threshold, setThreshold] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [subject, setSubject] = useState('');
    const [pub_brand, setPubBrand] = useState('');
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

const handleAddCategory = (event) => {
    event.preventDefault();
    navigate('/category/createCategory');
};

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createProduct', { name, category, consumable, traceable, description, expiration, threshold, serial_number, isbn, subject, pub_brand }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
     ////for searcheable category
     const categoryOptions = allCategories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption ? selectedOption.value : '');
    };
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-70 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2>Add Item to Inventory</h2>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Item Name</label>
                            <input type='text' 
                                placeholder='Enter Item Name'
                                required 
                                className='form-control'
                                onChange={e => setName(e.target.value)}
                            />

                        </div>
                        <div className='mb-2 col-6'>
                        <div className='row'>
                            <div className='mb-2 col-9'>
                            
                                <label htmlFor='category'>Category</label>
                                <Select
                                        options={categoryOptions}
                                        value={categoryOptions.find((option) => option.value === category)}
                                        onChange={handleCategoryChange}
                                    />
                                </div>
                                <div className='mb-2 col-3'>
                                <label> </label>
                                <button className='btn btn-success' onClick={handleAddCategory}>+</button>
                                </div>
                            
                            
                        </div>
                        </div>
                        
                    </div>

                    
                    <div className='row'>
                        <div className='col-6'>

                            <div className='mb-2'>
                                <label>
                                    <input type='checkbox' className='mr-2' onChange={() => setConsumable(!consumable)} />
                                    Consumable
                                </label>
                            </div>
                    
                            <div className='mb-2'>
                                <label>
                                    <input type='checkbox' className='mr-2' onChange={() => setTraceable(!traceable)} />
                                    Traceable
                                </label>
                            </div>
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Description</label>
                            <textarea
                                placeholder='Enter Description'
                                className='form-control'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label>
                                <br></br>
                                <input type='checkbox' className='mr-2' onChange={() => setExpiration(!expiration)} />
                                Can Expire
                            </label>
                        </div>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Threshold</label>
                            <input type='number' placeholder='Enter Threshold' className='form-control'
                                onChange={e => setThreshold(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Serial Number</label>
                            <input type='text' 
                                placeholder='Enter Serial Number' 
                                value={serial_number}
                                className='form-control'
                                onChange={e => setSerialNumber(e.target.value)}
                            />
                        </div>
                        <div className='mb-2 col-6'>
                        <label htmlFor=''>ISBN</label>
                        <input type='text' placeholder='Enter ISBN' 
                            value={isbn}
                            className='form-control'
                            onChange={e => setIsbn(e.target.value)}
                        />
                    </div>

                    <div className='row'>
                    <div className='mb-2 col-6'>
                            <label htmlFor=''>Subject</label>
                            <input type='text' 
                                placeholder='Enter Subject' 
                                value={subject}
                                className='form-control'
                                onChange={e => setSubject(e.target.value)}
                            />
                        </div>

                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Publisher/Brand</label>
                            <input type='text' 
                                placeholder='Enter Publisher or Brand' 
                                value={pub_brand}
                                className='form-control'
                                onChange={e => setPubBrand(e.target.value)}
                            />
                        </div>
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

export default CreateProduct