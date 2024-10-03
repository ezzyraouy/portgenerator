import React, { useState , useEffect } from 'react';
import axios from 'axios';
const url = 'educations';
const apiUrl = process.env.REACT_APP_API_URL;

const Step2 = ({ SendData,loading,error}) => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    institution_name: '',
    description_fr: '',
    description_en: '',
    address_fr: '',
    address_en: '',
    start_date: '',
    end_date: '',
    is_current: 0,
    user_id: sessionStorage.getItem("id"),
  });

  // Function to fetch education info
  async function GetEducationInfo() {
    try {
      const response = await axios.get(`${apiUrl}/educations/${formData.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.status === 200) {
        console.log(response.data);
        const educationInfo = response.data;

        // Update formData with the fetched education information
        setFormData((prevData) => ({
          ...prevData,
          institution_name: educationInfo.institution_name || '',
          description_fr: educationInfo.description_fr || '',
          description_en: educationInfo.description_en || '',
          address_fr: educationInfo.address_fr || '',
          address_en: educationInfo.address_en || '',
          start_date: educationInfo.start_date || '',
          end_date: educationInfo.end_date || '',
          is_current:( educationInfo.is_current ? 1 : 0),
        }));
      } else {
        console.log('Education information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // useEffect to call GetEducationInfo when the component mounts
  useEffect(() => {
    if (formData.user_id) {
      GetEducationInfo(); // Only call if user_id is set
    }
  }, [formData.user_id]); // Runs when user_id changes

  // const SendData = async () => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/educations`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 201) {
  //       console.log('Education information saved');
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
      [name]: type === 'checkbox' ? (checked ? 1 : 0 ) : value,
    }));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 2: Education Details</h2>

      <label>
        Institution Name
        <input
          type="text"
          name="institution_name"
          value={formData.institution_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Description (FR)
        <textarea
          name="description_fr"
          value={formData.description_fr}
          onChange={handleChange}
        />
      </label>

      <label>
        Description (EN)
        <textarea
          name="description_en"
          value={formData.description_en}
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
        />
      </label>

      <label>
        Currently Studying
        <input
          type="checkbox"
          name="is_current"
          checked={formData.is_current}
          onChange={handleChange}
        />
      </label>

      <button onClick={() => {SendData(formData,url)}} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step2;
