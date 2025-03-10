import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, ButtonGroup, Button, Modal } from 'react-bootstrap';

function Login({ setSidebarActive }) {
  // State variables for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [user, setUser] = useState(null);

  // State variables for password change
  const [changeEmail, setChangeEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Modal control handlers
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoginMessage(`${parsedUser.name} - ${parsedUser.role}`);
        setSidebarActive(true);
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, [setSidebarActive]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post('https://ghaacademy.com.ng/login', { email, password });
        if (response.data.success) {
          const loggedInUser = response.data.user;
          setUser(loggedInUser);
          setLoginMessage(`${loggedInUser.name} - ${loggedInUser.role}`);
          setSidebarActive(true);
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          navigate('/dashboard');
        } else {
          setLoginMessage('Invalid email or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginMessage('Login failed. Please try again.');
      }
    } else {
      setLoginMessage('Please enter both email and password.');
    }
  };

  // Password change handler
  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      await axios.put('https://ghaacademy.com.ng/change_password', {
        change_email: changeEmail,
        old_password: oldPassword,
        new_password: newPassword,
      });
      setMessage('Password updated successfully.');
      setChangeEmail('');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Password change error:', error);
      setMessage('Error updating password. Please try again.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setLoginMessage('');
    setSidebarActive(false);
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Container>
      {!user ? (
        <form onSubmit={handleLogin}>
          <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-30 bg-white rounded p-3">
              <center>
                <img src="logo.png" style={{ width: '100px', height: '100px' }} alt="Logo" />
              </center>
              <div className="mb-2">
                <label>Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <ButtonGroup>
                <button type="button" className="btn secondary" onClick={handleLogout}>
                  Cancel
                </button>
                <button type="submit" className="btn success">
                  Login
                </button>
              </ButtonGroup>
              <br></br>
              <a href="#" className='float-end small' onClick={(e) => { e.preventDefault(); handleShow(); }}>Change Password</a>
              {loginMessage && <div className="mt-3">{loginMessage}</div>}
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center mt-5">
          <h3>Current User: {user.name}</h3>
          <button className="btn secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="form-control"
              onChange={(e) => setChangeEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Old Password</label>
            <input
              type="password"
              placeholder="Enter your old password"
              required
              className="form-control"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              required
              className="form-control"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {message && <p className="mt-3">{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleChangePassword}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
