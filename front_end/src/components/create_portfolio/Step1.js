import React, { useState , useEffect} from 'react';

import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
const url = 'user-information';
const Step1 = ({ SendData,loading,error}) => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    birth_date: '',
    address_fr: '',
    address_en: '',
    email_address: '',
    profile_picture: '',
    social_links: 'tes',
    bio: '',
    github_username: '',
    resume_fr: '',
    resume_en: '',
    user_id: sessionStorage.getItem("id"),
  });
    // Function to fetch user info
  async function GetUserInfo() {
    try {
      const response = await axios.get(`${apiUrl}/user-information/${formData.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.status === 200) {
        console.log(response.data)
        const userInfo = response.data;

        // Update formData with the fetched user information
        setFormData((prevData) => ({
          ...prevData,
          full_name: userInfo.full_name || '',
          phone_number: userInfo.phone_number || '',
          birth_date: userInfo.birth_date || '',
          address_fr: userInfo.address_fr || '',
          address_en: userInfo.address_en || '',
          email_address: userInfo.email_address || '',
          picture: userInfo.picture || '',
          social_links: userInfo.social_links || '',
          bio: userInfo.bio || '',
          github_username: userInfo.github_username || '',
          resume_fr: userInfo.resume_fr || '',
          resume_en: userInfo.resume_en || '',
        }));
      } else {
        console.log('User information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // useEffect to call GetUserInfo when the component mounts
  useEffect(() => {
    if (formData.user_id) {
      GetUserInfo(); // Only call if user_id is set
    }
  }, [formData.user_id]); // Runs when user_id changes

  //  const SendData  = async () =>{
  //   try {
  //       const response = await axios.post(`${apiUrl}/user-information`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
    
  //       if (response.status === 201) {
  //            console.log('done')
  //           nextStep()
  //       } else {
  //         setError(response.data.message || 'An error occurred ,Please try again.');
  //       }
    
  //     } catch (error) {
  //       if (error.response) {
  //         setError(error.response.data.message || 'An error occurred. Please try again.');
  //       } else if (error.request) {
  //         setError('No response from server. Please try again.');
  //       } else {
  //         setError('An error occurred. Please try again.');
  //       }
  //     } finally {
  //       setLoading(false); 
  //     }
  // }
  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
        {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 1: Personal Details</h2>
      
      <label>
        Full Name
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Phone Number
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </label>

      <label>
        Birth Date
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
      </label>

      <label>
        Address (FR)
        <input
          type="text"
          name="address_fr"
          value={formData.address_fr}
          onChange={handleChange}
        />
      </label>

      <label>
        Address (EN)
        <input
          type="text"
          name="address_en"
          value={formData.address_en}
          onChange={handleChange}
        />
      </label>

      <label>
        Email Address
        <input
          type="email"
          name="email_address"
          value={formData.email_address}
          onChange={handleChange}
        />
      </label>

      <label>
        Picture 
        <input
          type="file"
          name="picture"
          value={formData.profile_picture}
          onChange={handleChange}
        />
      </label>

      <label>
        Social Links
        <input
          type="text"
          name="social_links"
          value={formData.social_links}
          onChange={handleChange}
        />
      </label>

      <label>
        Bio
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </label>

      <label>
        GitHub Username
        <input
          type="text"
          name="github_username"
          value={formData.github_username}
          onChange={handleChange}
        />
      </label>

      <label>
        Resume (FR)
        <input
          type="text"
          name="resume_fr"
          value={formData.resume_fr}
          onChange={handleChange}
        />
      </label>

      <label>
        Resume (EN)
        <input
          type="text"
          name="resume_en"
          value={formData.resume_en}
          onChange={handleChange}
        />
      </label>

      <button onClick={() => {SendData(formData,url)}} disabled={loading} > {loading ? 'Next...' : 'Next'}</button>
    </div>
  );
};

export default Step1;
