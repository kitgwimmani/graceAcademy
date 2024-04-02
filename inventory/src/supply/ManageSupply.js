import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Modal } from 'react-bootstrap';
import Select from 'react-select';
import '../App.css';
function ManageSupply() {
    const [location, setLocation] = useState('');
    const [unit, setUnit] = useState('');
    const [custodian, setCustodian] = useState('');
    const [dateMoved, setDateMoved] = useState('');
    const [dateExpected, setDateExpected] = useState('');
    const [quantity, setQuantity] = useState('');
    const [damage, setDamage] = useState('');
    const [remark, setRemark] = useState('');


    const [allProducts, setAllProducts] = useState([]);
    const [unitSums, setUnitSums] = useState([]);
    const [allProductCustodians, setProductCustodians] = useState([]);
    const [allCustodians, setAllCustodians] = useState([]);
    const [product, setProduct] = useState([]);
    const [damage_category, setDamageCategory] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [allLocations, setAllLocation] = useState([]);
    //const [allUnits, setAllUnits] = useState([]);

    //############### Modal ######################
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModalDamage, setShowModalDamage] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleClose2 = () => setShowModal2(false);
    const handleShow2 = () => setShowModal2(true);
    const handleCloseModalDamage = () => setShowModalDamage(false);
    const handleShowModalDamage = () => setShowModalDamage(true);
    //############### Modal ######################

    useEffect(() => {
        axios.get(`http://localhost:8081/getProductSupplied/${id}`)
            .then(res => {
                setAllProducts(res.data);
                const userData = res.data;
                setProduct(userData[0].item);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        //get from view
        axios.get(`http://localhost:8081/getProductCustodians/${id}`)
            .then(res => {
                setProductCustodians(res.data);
                //const userData = res.data;

            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/getProductUnitSums/${id}`)
            .then(res => {
                setUnitSums(res.data);
                //const userData = res.data;
                // console.log(userData)
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/custodian').then(res => setAllCustodians(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/damage_category').then(res => setDamageCategory(res.data))
            .catch(err => console.log(err));
    }, [])




    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/moveItem', { location, custodian, unit, dateMoved, dateExpected, quantity }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }

    function handleSubmit2(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/moveItem', { location, custodian, unit, dateMoved, dateExpected, quantity }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }

    function handleSubmitDamage(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/reportDamage', { unit, quantity}).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }

    //##############################

    ////for searcheable location
    const locationOptions = allLocations.map((location) => ({
        value: location.id,
        label: location.name,
    }));

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption ? selectedOption.value : '');
    };
    //##############################

    ////for searcheable unit
    const unitOptions = unitSums.map((unit) => ({
        value: unit.id,
        label: unit.unit,
    }));

    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption ? selectedOption.value : '');
    };
    //##############################

    ////for searcheable damage category
    const damageOptions = damage_category.map((damage) => ({
        value: damage.id,
        label: damage.name,
    }));

    const handleDamageChange = (selectedOption) => {
        setDamage(selectedOption ? selectedOption.value : '');
    };

    //##############################

    ////for searcheable custodian
    const custodianOptions = allCustodians.map((custodian) => ({
        value: custodian.id,
        label: custodian.name,
    }));

    const handleCustodianChange = (selectedOption) => {
        setCustodian(selectedOption ? selectedOption.value : '');
    };
    //##############################

    // Initialize state with today's date
    const [currentDate, setCurrentDate] = useState(getTodayDate());

    // Function to get today's date in the format 'YYYY-MM-DD'
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Add leading zeros if month/day are single digit
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }


    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-100 bg-white rounded p-3'>

                <h2>Manage <b>{product}</b></h2>
                <Table striped bordered hover style={{ fontSize: '12px', marginBottom: '20px' }}>

                    <thead>
                        <tr>
                            <th>Date Supplied</th>
                            <th>Supplier</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProducts.map((data, i) => (

                                <tr key={i}>
                                    <td>{data.date}</td>

                                    <td>
                                        <Link to={`../supply/creatSupply`} style={{ textDecoration: 'none', color: 'inherit' }} className=''>
                                            {data.supplier}
                                        </Link>
                                    </td>

                                    <td>{data.unit}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.expiry_date}</td>

                                </tr>
                            ))

                        }

                    </tbody>
                </Table>
                <div className='row'>
                    <div className='mb-2 col-2'>
                        <h6>Inventory</h6>
                        <Table bordered striped style={{ fontSize: '12px', marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    unitSums.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.unit}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className='mb-2 col-10'>
                        <h6>Custodian/location</h6>
                        <Table bordered striped style={{ fontSize: '12px', marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>Custodian</th>
                                    <th>Location</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Date Moved</th>
                                    <th>Date Expected</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProductCustodians.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.cname}</td>
                                            <td>{data.lname}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.tunit}</td>
                                            <td>{data.date_moved}</td>
                                            <td>{data.date_expected}</td>
                                            <td><button className='btn btn-sm secondary' type="button" onClick={handleShow2}>Change</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>


                <ButtonGroup>
                    <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn success' onClick={handleShowModalDamage}>Report Damage</button>
                    <button className='btn btn-light' type="button" onClick={handleShow}>Move Item</button>
                    <button className='btn secondary' onClick={handleGoBack}>Exit Item</button>
                    <button className='btn success' onClick={handleGoBack}>Add to Reorder List</button>

                </ButtonGroup>

            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Move {product}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12'>
                            <label htmlFor='location'>TO: (Location)</label>
                            <Select
                                options={locationOptions}
                                value={locationOptions.find((option) => option.value === location)}
                                onChange={handleLocationChange}
                            />

                        </div>
                        <div className='col-12'>
                            <label htmlFor='custodian'>TO: (Custodian)</label>
                            <Select
                                options={custodianOptions}
                                value={custodianOptions.find((option) => option.value === custodian)}
                                onChange={handleCustodianChange}
                            />

                        </div>


                        <div className='col-12'>
                            <label htmlFor=''>Date Moved</label>
                            <input type='date'
                                placeholder='Enter Date Moved'
                                value={currentDate}
                                className='form-control'
                                onChange={e => setDateMoved(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Date Expected</label>
                            <input type='date'
                                placeholder='Enter Expected'
                                className='form-control'
                                onChange={e => setDateExpected(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor='unit'>Unit</label>
                            <Select
                                options={unitOptions}
                                value={unitOptions.find((option) => option.value === unit)}
                                onChange={handleUnitChange}
                                required
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Quantity</label>
                            <input type='number'
                                placeholder='Enter Quantity'
                                required
                                className='form-control'
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="light" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Change {product} Custodian</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                    <div className='col-12'>
                            <label htmlFor='location'>TO: (Location)</label>
                            <Select
                                options={locationOptions}
                                value={locationOptions.find((option) => option.value === location)}
                                onChange={handleLocationChange}
                            />

                        </div>
                        <div className='col-12'>
                            <label htmlFor='custodian'>TO: (Custodian)</label>
                            <Select
                                options={custodianOptions}
                                value={custodianOptions.find((option) => option.value === custodian)}
                                onChange={handleCustodianChange}
                            />

                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Date Transferred</label>
                            <input type='date'
                                placeholder='Date to Transfer'
                                value={currentDate}
                                className='form-control'
                                onChange={e => setDateMoved(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Quantity</label>
                            <input type='number'
                                placeholder='Enter Quantity'
                                required
                                className='form-control'
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Date Expected</label>
                            <input type='date'
                                placeholder='Enter Expected'
                                className='form-control'
                                onChange={e => setDateExpected(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="light" onClick={handleSubmit2}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDamage} onHide={handleCloseModalDamage}>
                <Modal.Header closeButton>
                    <Modal.Title>Report {product} Damage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                    <div className='col-12'>
                            <label htmlFor='damage'>Type of Damage</label>
                            <Select
                                options={damageOptions}
                                value={damageOptions.find((option) => option.value === damage)}
                                onChange={handleDamageChange}
                                required
                            />

                        </div>

                        <div className='col-12'>
                            <label htmlFor='unit'>Unit</label>
                            <Select
                                options={unitOptions}
                                value={unitOptions.find((option) => option.value === unit)}
                                onChange={handleUnitChange}
                                required
                            />
                        </div>
                     
                        <div className='col-12'>
                            <label htmlFor=''>Quantity</label>
                            <input type='number'
                                placeholder='Enter Quantity'
                                required
                                maxLength={1}
                                className='form-control'
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label htmlFor=''>Remark</label>
                            <textarea
                                placeholder='Enter Remark'
                                className='form-control'
                                onChange={e => setRemark(e.target.value)}
                            />
                        </div>


                       
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalDamage}>
                        Close
                    </Button>
                    <Button variant="light" onClick={handleSubmitDamage}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ManageSupply