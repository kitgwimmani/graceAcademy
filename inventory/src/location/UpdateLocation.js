import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateLocation() {
    const [name, setName] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getLocation/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateLocation/'+id, {name}).then(res => {
            console.log(res);
            navigate('/location');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Location</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Location Name</label>
                    <input type='text' 
                        placeholder='Enter Location Name' 
                        className='form-control'
                        value ={name}
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>
    
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateLocation