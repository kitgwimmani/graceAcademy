import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateSupplier() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createSupplier', {name, address, phone}).then(res => {
            console.log(res);
            navigate('/supplier');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Supplier</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Supplier Name</label>
                    <input type='text' placeholder='Enter Supplier Name' className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Address</label>
                    <textarea
                                placeholder='Enter Address'
                                className='form-control'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Phone</label>
                    <input type='text' placeholder='Enter Phone' className='form-control'
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

               
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateSupplier