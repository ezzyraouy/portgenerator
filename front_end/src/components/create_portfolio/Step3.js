import React, { useState, useEffect } from 'react';
import axios from 'axios';
const url = 'experiences';
const apiUrl = process.env.REACT_APP_API_URL;

const Step3 = ({ SendData,loading,error}) => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    role_description_fr: '',
    role_description_en: '',
    address_fr: '',
    address_en: '',
    start_date: '',
    end_date: '',
    is_current: 0,
    company_website: '',
    skills_acquired: '',
    user_id: sessionStorage.getItem("id"),
  });

  // Function to fetch experience info
  async function GetExperienceInfo() {
    try {
      const response = await axios.get(`${apiUrl}/experiences/${formData.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.status === 200) {
        console.log(response.data);
        const experienceInfo = response.data;

        // Update formData with the fetched experience information
        setFormData((prevData) => ({
          ...prevData,
          company_name: experienceInfo.company_name || '',
          role: experienceInfo.role || '',
          role_description_fr: experienceInfo.role_description_fr || '',
          role_description_en: experienceInfo.role_description_en || '',
          address_fr: experienceInfo.address_fr || '',
          address_en: experienceInfo.address_en || '',
          start_date: experienceInfo.start_date || '',
          end_date: experienceInfo.end_date || '',
          is_current: (experienceInfo.is_current ? 1 : 0) ,
          company_website: experienceInfo.company_website || '',
          skills_acquired: experienceInfo.skills_acquired || '',
        }));
      } else {
        console.log('Experience information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // useEffect to call GetExperienceInfo when the component mounts
  useEffect(() => {
    if (formData.user_id) {
      GetExperienceInfo(); // Only call if user_id is set
    }
  }, [formData.user_id]); // Runs when user_id changes

  // const SendData = async () => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/experiences`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 201) {
  //       console.log('Experience information saved');
  //       nextStep();
  //     } else {
  //       setError(response.data.message || 'An error occurred. Please try again.');
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       setError(error.response.data.message || 'An error occurred. Please try again.');
  //     } else if (error.request) {
  //       setError('No response from server. Please try again.');
  //     } else {
  //       setError('An error occurred. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 3: Experience Details</h2>

      <label>
        Company Name
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Role
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </label>

      <label>
        Role Description (FR)
        <textarea
          name="role_description_fr"
          value={formData.role_description_fr}
          onChange={handleChange}
        />
      </label>

      <label>
        Role Description (EN)
        <textarea
          name="role_description_en"
          value={formData.role_description_en}
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
        Start Date
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </label>

      <label>
        End Date
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          disabled={formData.is_current} // Disable if currently employed
        />
      </label>

      <label>
        Currently Employed
        <input
          type="checkbox"
          name="is_current"
          checked={formData.is_current}
          onChange={handleChange}
        />
      </label>

      <label>
        Company Website
        <input
          type="url"
          name="company_website"
          value={formData.company_website}
          onChange={handleChange}
        />
      </label>

      <label>
        Skills Acquired
        <textarea
          name="skills_acquired"
          value={formData.skills_acquired}
          onChange={handleChange}
        />
      </label>

      <button onClick={() => {SendData(formData,url)}} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step3;
