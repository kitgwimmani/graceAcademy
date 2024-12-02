import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Container, ButtonGroup, Button, Modal } from 'react-bootstrap';

function Login({ setSidebarActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');

  const [message, setMessage] = useState('');

  const [change_email, setChangeEmail] = useState('');
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

  useEffect(() => {
    // Check if user session exists in sessionStorage on component mount
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Try parsing the stored user data
        setUser(parsedUser);
        setLoginMessage(`${parsedUser.name} - ${parsedUser.role}`);
        setSidebarActive(true); // Activate the sidebar
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
        // Handle the case when stored data is not valid JSON
      }
    }
  }, [setSidebarActive]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      // Sending both email and password to the backend
      axios
        .post('http://localhost:8081/login', { email, password }) // Use POST for better security (password in the body)
        .then((res) => {
          if (res.data.success) {
            // Assuming the response contains a success flag and user data
            setUser(res.data.user);
            setLoginMessage(`${res.data.user.name} - ${res.data.user.role}`);
            setSidebarActive(true); // Activate the sidebar
            sessionStorage.setItem('user', JSON.stringify(res.data.user)); // Store user session
          } else {
            setLoginMessage('Invalid email or password.');
          }
        })
        .catch((err) => {
          console.error(err);
          setLoginMessage('Login failed. Please try again.');
        });
    } else {
      setLoginMessage('Please enter both email and password.');
    }
  };

  function handleChangePassword(event) {
    event.preventDefault();

    axios.put(`http://localhost:8081/change_password`, { change_email, old_password, new_password})
        .then(res => {
            setMessage('Password updated successfully'); // Success message
            // Optionally, reset the fields or close the modal
            setChangeEmail('');
            setOldPassword('');
            setNewPassword('');
        })
        .catch(err => {
            console.log(err);
            setMessage('There was an error updating the password. Please try again.'); // Error message
        });
}

  const handleLogout = () => {
    setUser(null);
    setLoginMessage('');
    setSidebarActive(false); // Deactivate the sidebar after logout
    sessionStorage.removeItem('user'); // Clear user session
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <Container>
      {!user && (
        <form onSubmit={handleLogin}>
          <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-30 bg-white rounded p-3">
              <center>
                <img src="logo.png" style={{ width: '100px', height: '100px' }} alt="Logo" />
              </center>
              <div className="row">
                <div className="mb-2">
                  <label>Email</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <ButtonGroup>
                <button type="button" className="btn secondary" onClick={handleLogout}>Cancel</button>
                <button type="submit" className="btn success">Login</button>
              </ButtonGroup>

              <ButtonGroup className="float-end">
                <button type="button" className="btn btn-secondary" onClick={handleShow}>Change password</button>
                
              </ButtonGroup>
              {loginMessage && <div className="mt-3">{loginMessage}</div>}
            </div>
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change your password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-12'>
                        <label htmlFor=''>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            required
                            className='form-control'
                            onChange={e => setChangeEmail(e.target.value)}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor=''>Old Password</label>
                        <input
                            type='password'
                            required
                            className='form-control'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor=''>New Password</label>
                        <input
                            type='password'
                            required
                            className='form-control'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                {message && (
                    <div className="mt-3">
                        <p>{message}</p> {/* Displaying the message */}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="light" onClick={handleChangePassword}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
          </div>
        </form>

        
      )}
    </Container>
  );
}

export default Login;
