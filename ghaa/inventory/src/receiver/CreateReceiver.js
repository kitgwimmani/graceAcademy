import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

function CreateReceiver() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.post('https://graceaaapi.cloudsync.com.ng/createReceiver', {name, address, phone}).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Receiver</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Receiver Name</label>
                    <input type='text' 
                        placeholder='Enter Receiver Name' 
                        required
                        className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Address</label>
                    <textarea
                                placeholder='Enter Address'
                                className='form-control'
                                value={address}
                                required
                                onChange={e => setAddress(e.target.value)}
                            />
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Phone</label>
                    <input type='text' placeholder='Enter Phone' className='form-control'
                        onChange={e => setPhone(e.target.value)}
                    />
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

export default CreateReceiver