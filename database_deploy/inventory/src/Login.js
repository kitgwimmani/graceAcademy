import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ButtonGroup } from 'react-bootstrap';

function Login({ setSidebarActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    // Check if user session exists in sessionStorage on component mount
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoginMessage(`${parsedUser.name} - ${parsedUser.role}`);
      setSidebarActive(true, handleLogout);
    }
  }, [setSidebarActive]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      axios
        .get(`http://localhost:8081/login/${email}`)
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            setLoginMessage(`${res.data.name} - ${res.data.role}`);
            setSidebarActive(true, handleLogout); // Pass handleLogout to sidebar
            sessionStorage.setItem('user', JSON.stringify(res.data)); // Store user session
          } else {
            setLoginMessage('User not found');
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

  const handleLogout = () => {
    setUser(null);
    setLoginMessage('');
    setSidebarActive(true); // today
    sessionStorage.removeItem('user'); // Clear user session
    window.location.href = '/';
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
                <button type="button" className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn secondary">Login</button>
              </ButtonGroup>
              {loginMessage && <div className="mt-3">{loginMessage}</div>}
            </div>
          </div>
        </form>
      )}
    </Container>
  );
}

export default Login;
