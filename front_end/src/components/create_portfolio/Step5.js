import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const url = 'languages';

const Step5 = ({ SendData, loading, error }) => {
  const initialLanguage = {
    language_name: '',
    proficiency_level: '',
    certification: '',
    years_of_experience: '',
    is_primary: 0,
    description_fr: '',
    description_en: '',
    user_id: sessionStorage.getItem("id"),
  };

  // State to hold multiple language entries
  const [languages, setLanguages] = useState([initialLanguage]);

  // Function to fetch languages info for the user
  async function GetLanguageInfo() {
    try {
      const response = await axios.get(`${apiUrl}/languages/${initialLanguage.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const fetchedLanguages = response.data;

        // If language information is found, update the state
        setLanguages(fetchedLanguages.map(language => ({
          language_name: language.language_name || '',
          proficiency_level: language.proficiency_level || '',
          certification: language.certification || '',
          years_of_experience: language.years_of_experience || '',
          is_primary: language.is_primary || false,
          description_fr: language.description_fr || '',
          description_en: language.description_en || '',
          user_id: sessionStorage.getItem("id"),
        })));
      } else {
        console.log('Language information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    if (initialLanguage.user_id) {
      GetLanguageInfo();
    }
  }, [initialLanguage.user_id]);

  // Handler to update form data for a specific language entry
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    };
    setLanguages(updatedLanguages);
  };

  // Function to add a new language entry
  const addLanguage = () => {
    setLanguages([...languages, initialLanguage]);
  };

  // Function to remove a language entry
  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 5: Language Details</h2>

      {languages.map((language, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <label>
            Language Name
            <input
              type="text"
              name="language_name"
              value={language.language_name}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Proficiency Level
            <input
              type="text"
              name="proficiency_level"
              value={language.proficiency_level}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Certification
            <input
              type="text"
              name="certification"
              value={language.certification}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Years of Experience
            <input
              type="number"
              name="years_of_experience"
              value={language.years_of_experience}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Primary Language
            <input
              type="checkbox"
              name="is_primary"
              checked={language.is_primary}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Description (FR)
            <textarea
              name="description_fr"
              value={language.description_fr}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Description (EN)
            <textarea
              name="description_en"
              value={language.description_en}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <button type="button" onClick={() => removeLanguage(index)} disabled={languages.length === 1}>
            Remove Language
          </button>

          <hr />
        </div>
      ))}

      <button type="button" onClick={addLanguage}>Add Another Language</button>

      <button onClick={() => { SendData(languages, url) }} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step5;
