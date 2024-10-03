import React, { useState, useEffect } from 'react';
import axios from 'axios';
const url = 'projects';
const apiUrl = process.env.REACT_APP_API_URL;

const Step4 = ({ SendData,loading,error}) => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title_fr: '',
    title_en: '',
    description_fr: '',
    description_en: '',
    image_path: '',
    video_url: '',
    project_link: '',
    tags: '',
    status: '',
    technologies_used: '',
    repository_link: '',
    client_name: '',
    user_id: sessionStorage.getItem("id"),
  });

  // Function to fetch project info
  async function GetProjectInfo() {
    try {
      const response = await axios.get(`${apiUrl}/projects/${formData.user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.status === 200) {
        const projectInfo = response.data;

        // Update formData with the fetched project information
        setFormData((prevData) => ({
          ...prevData,
          title_fr: projectInfo.title_fr || '',
          title_en: projectInfo.title_en || '',
          description_fr: projectInfo.description_fr || '',
          description_en: projectInfo.description_en || '',
          image_path: projectInfo.image_path || '',
          video_url: projectInfo.video_url || '',
          project_link: projectInfo.project_link || '',
          tags: projectInfo.tags || '',
          status: projectInfo.status || '',
          technologies_used: projectInfo.technologies_used || '',
          repository_link: projectInfo.repository_link || '',
          client_name: projectInfo.client_name || '',
        }));
      } else {
        console.log('Project information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  // useEffect to call GetProjectInfo when the component mounts
  useEffect(() => {
    if (formData.user_id) {
      GetProjectInfo(); // Only call if user_id is set
    }
  }, [formData.user_id]); // Runs when user_id changes

  // const SendData = async () => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/projects`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 201) {
  //       console.log('Project information saved');
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 4: Project Details</h2>

      <label>
        Title (FR)
        <input
          type="text"
          name="title_fr"
          value={formData.title_fr}
          onChange={handleChange}
        />
      </label>

      <label>
        Title (EN)
        <input
          type="text"
          name="title_en"
          value={formData.title_en}
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
        Image Path
        <input
          type="file"
          name="image_path"
          onChange={handleChange}
        />
      </label>

      <label>
        Video URL
        <input
          type="url"
          name="video_url"
          value={formData.video_url}
          onChange={handleChange}
        />
      </label>

      <label>
        Project Link
        <input
          type="url"
          name="project_link"
          value={formData.project_link}
          onChange={handleChange}
        />
      </label>

      <label>
        Tags
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>

      <label>
        Technologies Used
        <input
          type="text"
          name="technologies_used"
          value={formData.technologies_used}
          onChange={handleChange}
        />
      </label>

      <label>
        Repository Link
        <input
          type="url"
          name="repository_link"
          value={formData.repository_link}
          onChange={handleChange}
        />
      </label>

      <label>
        Client Name
        <input
          type="text"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
        />
      </label>

      <button onClick={() => {SendData(formData,url)}} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step4;
