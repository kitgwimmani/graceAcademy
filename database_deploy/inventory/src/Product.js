import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, Button, Modal } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

function Product() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (barcode) => {
    setSelectedBarcode(barcode);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8081/product')
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8081/category')
      .then((res) => setAllCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirmDelete()) {
        await axios.delete(`http://localhost:8081/product/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    return isConfirmed;
  };

  const handleSubmit = () => {
    const printWindow = window.open('', '', 'height=600,width=800'); // Open a new window for printing
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { text-align: center; }
            .barcode { margin: 20px auto; }
          </style>
        </head>
        <body>
          <div class="barcode">
            <img src="https://barcode.tec-it.com/barcode.ashx?data=${selectedBarcode}&code=Code128&unit=Millimeter&dpi=72&moduleWidth=1&showLabel=false" alt="Barcode" />
            <p>${selectedBarcode}</p>
          </div>
          <script>
            window.print();
            window.onafterprint = window.close;
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="main-content">
      <Container>
        <h5 className="mt-4">Items List</h5>
        <Link to="/product/createProduct" className="btn success">
          Add +
        </Link>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Product"
            />
          </InputGroup>
        </Form>
        <div style={{ height: '500px', overflow: 'auto' }}>
          <Table striped bordered style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Consumable</th>
                <th>Traceable</th>
                <th>Description</th>
                <th>Can Expire</th>
                <th>Threshold</th>
                <th>Serial Number</th>
                <th>ISBN</th>
                <th>Print Barcode</th>
                <th>Subject</th>
                <th>Publisher/Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product
                .filter((data) => {
                  const searchLower = search.toLowerCase();
                  return (
                    searchLower === '' ||
                    Object.values(data).some(
                      (value) =>
                        value &&
                        value.toString().toLowerCase().includes(searchLower)
                    )
                  );
                })
                .map((data, i) => (
                  <tr key={i}>
                    <td>
                      <NavLink to={`/supply/manageSupply/${data.id}`}>
                        {data.name}
                      </NavLink>
                    </td>
                    <td>
                      {allCategory.find(
                        (allCategory) => allCategory.id === data.category
                      )?.name || 'Item Not Found'}
                    </td>
                    <td>{data.consumable ? 'Yes' : 'No'}</td>
                    <td>{data.traceable ? 'Yes' : 'No'}</td>
                    <td>{data.description}</td>
                    <td>{data.expiration ? 'Yes' : 'No'}</td>
                    <td>{data.threshold}</td>
                    <td>{data.serial_number}</td>
                    <td>{data.isbn}</td>
                    <td>
                      <button
                        className="barcode-button tiny-button"
                        type="button"
                        onClick={() => handleShow(data.barcode)}
                      >
                        <img
                          src={`https://barcode.tec-it.com/barcode.ashx?data=${data.barcode}&code=Code128&unit=Millimeter&dpi=72&moduleWidth=1&showLabel=false`}
                          alt="Barcode"
                        />
                      </button>
                    </td>
                    <td>{data.subject}</td>
                    <td>{data.pub_brand}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          to={`updateProduct/${data.id}`}
                          className="btn btn-light btn-sm"
                        >
                          Update
                        </Link>
                        <Dropdown>
                          <Dropdown.Toggle
                            split
                            variant="light"
                            className="btn-sm"
                            id="dropdown-split-basic"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={(e) => handleDelete(data.id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Print Barcode</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img
                src={`https://barcode.tec-it.com/barcode.ashx?data=${selectedBarcode}&code=Code128&unit=Millimeter&dpi=72&moduleWidth=1&showLabel=false`}
                alt="Selected Barcode"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="light" onClick={handleSubmit}>
              Print
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Product;
