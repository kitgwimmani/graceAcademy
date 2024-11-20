import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import '../App.css';

function CreateUnit() {
    const [name, setName] = useState('');
    const [description, setUnit] = useState('');
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.post('https://ghaacademy.com.ng/createUnit', {name, description}).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Unit</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Unit Name</label>
                    <input type='text' 
                        placeholder='Enter Unit Name' 
                        required
                        className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Description</label>
                    <input type='text' 
                        placeholder='Enter Description' 
                        required
                        className='form-control'
                        onChange={e => setUnit(e.target.value)}
                    />
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

export default CreateUnit