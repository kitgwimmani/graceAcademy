import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import '../App.css';
function UpdateSupplier() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://ghaacademy.com.ng/getSupplier/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
                    setAddress(userData[0].address);
                    setPhone(userData[0].phone);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };
    function handleSubmit(event){
        event.preventDefault();
        axios.put('https://ghaacademy.com.ng/updateSupplier/'+id, {name, address, phone}).then(res => {
            console.log(res);
            navigate('/supplier');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2><label className='required'>* </label>Update Supplier</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Supplier Name</label>
                    <input type='text' 
                        placeholder='Enter Supplier Name' 
                        className='form-control'
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''><label className='required'>* </label>Address</label>
                    <textarea
                        placeholder='Enter Address'
                        className='form-control'
                        value={address}
                        required
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                <div className='mb-2'>
                    <label htmlFor=''><label className='required'>* </label>Supplier Phone Number</label>
                    <input type='text' 
                        placeholder='Enter Supplier Phone Number' 
                        className='form-control'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    
                </div>

                <ButtonGroup>
                    <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn success'>Update</button>
                </ButtonGroup>
            </form>
        </div>
    </div>
  )
}

export default UpdateSupplier