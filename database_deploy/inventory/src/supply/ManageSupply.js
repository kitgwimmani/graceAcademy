import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Modal, Container } from 'react-bootstrap';
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
    const [reorder, setReorderStatus] = useState('');


    const [allProductsReorder, setAllProductsReorder] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [unitSums, setUnitSums] = useState([]);
    const [allProductCustodians, setProductCustodians] = useState([]);
    const [allCustodians, setAllCustodians] = useState([]);
    const [product, setProduct] = useState([]);
    const [bar, setBar] = useState([]);
    const [damage_category, setDamageCategory] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [allLocations, setAllLocation] = useState([]);
    const [allUnits, setAllUnits] = useState([]);

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
                setBar(userData[0].barcode);

            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/getProduct/${id}`)
            .then(res => {
                setAllProductsReorder(res.data);
                const userData = res.data;
                setReorderStatus(userData[0].reorder_status)
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
        axios.get(`http://localhost:8081/getProductUnits/${id}`)
            .then(res => {
                setAllUnits(res.data);
                //const userData = res.data;
                // console.log(userData)
            })
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
        axios.post(`http://localhost:8081/moveItem/${id}`, { location, custodian, dateMoved, dateExpected, unit, quantity }).then(res => {
            //alert(res);
            navigate(0);
        }).catch(err => console.log(err));
    }

    function handleSubmit2(event) {
        event.preventDefault();
        axios.post(`http://localhost:8081/changeCustodian/${current_transfer_id}`, { location, custodian, dateMoved, dateExpected }).then(res => {
            //console.log(res);
            navigate(0);
        }).catch(err => console.log(err));
    }

    function handleSubmitDamage(event) {
        event.preventDefault();
        axios.post(`http://localhost:8081/reportDamage/${id}`, { unit, quantity, remark }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }

    function handleReorderStatus(event) {
        event.preventDefault();
        const stat = !reorder;
        axios.put('http://localhost:8081/updateReorderStatus/' + id, { stat }).then(res => {
            alert('Reorder Status Was Changed Successfully')
            window.location.reload()
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
        value: unit.unit_id,
        label: unit.unit,
    }));


    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption ? selectedOption.value : '');
        //alert(selectedOption.value)
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

    let current_transfer_id = 0;
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
        <Container>
            <h2 className="manage-header">
  <span className="product-name">Manage <b>{product}</b></span>
  <button className="barcode-button tiny-button">
    <img
      src={`https://barcode.tec-it.com/barcode.ashx?data=${bar}&code=Code128&unit=Millimeter&dpi=72&moduleWidth=1&showLabel=false`}
      alt="Barcode"
    />
  </button>
</h2>

            <div style={{ maxHeight: '280px', overflow: 'auto' }}>
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
                                    <td>{new Date(data.date).toLocaleDateString()}</td>

                                    <td>
                                        <Link to={`../supply/creatSupply`} style={{ textDecoration: 'none', color: 'inherit' }} className=''>
                                            {data.supplier}
                                        </Link>
                                    </td>

                                    <td>{data.unit}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.expiry_date ? new Date(data.expiry_date).toLocaleDateString() : ''}</td>
                                    
                                </tr>
                            ))

                        }

                    </tbody>
                </Table>
            </div>
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
                <div className='mb-2 col-10' style={{ height: '300px', overflow: 'auto' }}>
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
                                <th>transfer ID</th>
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
                                        <td>{current_transfer_id = data.id}</td>
                                        <td><button className='btn btn-sm secondary'
                                            style={{ '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.70rem' }}
                                            type="button" onClick={handleShow2}>Change</button></td>
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
                <button className='btn btn-light' type="button" onClick={handleShow}>Move Item/Change custodian</button>
                <button className='btn secondary' onClick={handleGoBack}>Exit Item</button>
                <button className='btn success' onClick={handleReorderStatus}>{reorder ? 'Remove from Reorder' : 'Add to Reorder'}</button>

            </ButtonGroup>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Move {product} / Change custodian</Modal.Title>
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
                                //value={currentDate}
                                required
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
                                placeholder='Please describe what happened'
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

        </Container>

    )
}

export default ManageSupply