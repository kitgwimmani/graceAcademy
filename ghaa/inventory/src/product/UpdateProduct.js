import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';


function UpdateProduct() {
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
    const {id} = useParams();
    const navigate = useNavigate();

    const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/category').then(res => setAllCategory(res.data))
      .catch(err => console.log(err));
  }, [])


    useEffect(() => {
        axios.get(`https://graceaaapi.cloudsync.com.ng/getProduct/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
                    setCategory(userData[0].category);
                    setConsumable(userData[0].consumable);
                    setTraceable(userData[0].traceable);
                    setDescription(userData[0].description);
                    setExpiration(userData[0].expiration);
                    setThreshold(userData[0].threshold);
                    setSerialNumber(userData[0].serial_number);
                    setIsbn(userData[0].isbn);
                    setSubject(userData[0].subject);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateProduct/${id}`, { name, category, consumable, traceable, description, expiration, threshold, serial_number, isbn, subject }).then(res => {
            console.log(res);
            navigate('/product');
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2>Add Item to Inventory</h2>
                    <div className='row'>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Item Name</label>
                            <input type='text' 
                                placeholder='Enter Item Name' 
                                required
                                className='form-control'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />

                        </div>
                        <div className='mb-2 col-6'>
                            <label htmlFor='category'>Category</label>
                            <select
                                id='category'
                                className='form-control'
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value='' disabled>Select Category</option>
                                {allCategory.map((allCategory) => (
                                <option key={allCategory.id} value={allCategory.id}>
                                    {allCategory.name}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    

                    <div className='row'>
                        <div className='col-6'>
                        <div className='mb-2'>
                            <label>
                                <input type='checkbox' className='mr-2' 
                                checked={consumable}
                                onChange={() => setConsumable(!consumable)} />
                                Consumable
                            </label>
                            </div>
                            <div className='mb-2'>
                            <label>
                                <input type='checkbox' className='mr-2' 
                                checked={traceable}
                                onChange={() => setTraceable(!traceable)} />
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
                                <input type='checkbox' className='mr-2'
                                checked={expiration} 
                                onChange={() => setExpiration(!expiration)} />
                                Can Expire
                            </label>
                        </div>
                        <div className='mb-2 col-6'>
                            <label htmlFor=''>Threshold</label>
                            <input type='number' placeholder='Enter Threshold' 
                                className='form-control'
                                value={threshold}
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
                    </div>


                    <ButtonGroup>
                        <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                        <button className='btn btn-success'>Update</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct