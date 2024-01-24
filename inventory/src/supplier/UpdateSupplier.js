import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSupplier() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getSupplier/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
                    setAddress(userData[0].address);
                    setPhone(userData[0].phone);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateSupplier/'+id, {name, address, phone}).then(res => {
            console.log(res);
            navigate('/supplier');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Supplier</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Supplier Name</label>
                    <input type='text' 
                        placeholder='Enter Supplier Name' 
                        className='form-control'
                        value={name}
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
                    <label htmlFor=''>Supplier Phone Number</label>
                    <input type='text' 
                        placeholder='Enter Supplier Phone Number' 
                        className='form-control'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    
                </div>

                
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateSupplier