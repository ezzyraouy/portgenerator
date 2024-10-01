import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link  } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Login({ onLoginSuccess }) { // Accept the callback function as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const sendData = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   setLoading(true); 
  //   try {
  //     const response = await axios.post(`${apiUrl}/login`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     if (response.status === 201) {
  //       sessionStorage.setItem("token", response.data.token);
  //       onLoginSuccess(); // Call the function to update isConnected
  //       navigate('/'); // Redirect to home page
  //     } else {
  //       setError('Login failed. Please try again.');
  //     }
  //   } catch (error) {
  //     setError('An error occurred. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    setLoading(true);
    
    try {
      const response = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id", response.data.user.id);
        onLoginSuccess(); 
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
  
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="card bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <div className="card-body p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-muted mb-3">Please enter your login and password!</p>

              {error && <div className="alert alert-danger">{error}</div>} {/* Show error messages */}

              <form onSubmit={sendData} className="w-100">
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe" className="form-label ms-2">Remember password</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </p>
              <hr className="my-4" />

              <button className="btn btn-danger btn-lg w-100 mb-2">
                <i className="fab fa-google me-2"></i>
                Sign in with Google
              </button>

              <button className="btn btn-primary btn-lg w-100" style={{ backgroundColor: '#3b5998' }}>
                <i className="fab fa-facebook-f me-2"></i>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
