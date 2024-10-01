import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const apiUrl = process.env.REACT_APP_API_URL;

function SingUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const sendData = async (e) => {
    e.preventDefault(); // Prevent form submission
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    setLoading(true); 
    try {
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        console.log("Success:", response.data);
        sessionStorage.setItem("token", response.data.token);
        console.log(sessionStorage.getItem("token"));
        navigate('/'); // Redirect to home page on success
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
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="card bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <div className="card-body p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-muted mb-3">Register!</p>

              {error && <div className="alert alert-danger">{error}</div>} {/* Show error messages */}

              <form onSubmit={sendData} className="w-100">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>
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
                  {loading ? ' Register...' : 'Register'}
                </button>
              </form>

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

export default SingUp;
