import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const url = 'languages';
const Step5 = ({ SendData,loading,error}) => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    language_name: '',
    proficiency_level: '',
    certification: '',
    years_of_experience: '',
    is_primary: false,
    description_fr: '',
    description_en: '',
    user_id: sessionStorage.getItem("id"),
  });

  // Function to fetch language info
  async function GetLanguageInfo() {
    try {
      const response = await axios.get(`${apiUrl}/languages/${formData.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const languageInfo = response.data;

        // Update formData with the fetched language information
        setFormData((prevData) => ({
          ...prevData,
          language_name: languageInfo.language_name || '',
          proficiency_level: languageInfo.proficiency_level || '',
          certification: languageInfo.certification || '',
          years_of_experience: languageInfo.years_of_experience || '',
          is_primary: languageInfo.is_primary || false,
          description_fr: languageInfo.description_fr || '',
          description_en: languageInfo.description_en || '',
        }));
      } else {
        console.log('Language information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // useEffect to call GetLanguageInfo when the component mounts
  useEffect(() => {
    if (formData.user_id) {
      GetLanguageInfo(); // Only call if user_id is set
    }
  }, [formData.user_id]); // Runs when user_id changes

  // const SendData = async () => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/languages`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 201) {
  //       console.log('Language information saved');
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
      [name]: type === 'checkbox' ? (checked ? 1: 0) : value,
    }));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 5: Language Details</h2>

      <label>
        Language Name
        <input
          type="text"
          name="language_name"
          value={formData.language_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Proficiency Level
        <input
          type="text"
          name="proficiency_level"
          value={formData.proficiency_level}
          onChange={handleChange}
        />
      </label>

      <label>
        Certification
        <input
          type="text"
          name="certification"
          value={formData.certification}
          onChange={handleChange}
        />
      </label>

      <label>
        Years of Experience
        <input
          type="number"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleChange}
        />
      </label>

      <label>
        Primary Language
        <input
          type="checkbox"
          name="is_primary"
          checked={formData.is_primary}
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

      <button onClick={() => {SendData(formData,url)}} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step5;
