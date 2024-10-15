import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'projects';
const apiUrl = process.env.REACT_APP_API_URL;

const Step4 = ({ SendData, loading, error }) => {
  const [projects, setProjects] = useState([
    {
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
      user_id: sessionStorage.getItem('id'),
    },
  ]);

  // Function to handle adding a new project form
  const addNewProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
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
        user_id: sessionStorage.getItem('id'),
      },
    ]);
  };

  // Function to handle form input changes
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, [name]: value } : project
      )
    );
  };

  // Function to fetch project info
  async function GetProjectInfo() {
    try {
      const response = await axios.get(`${apiUrl}/projects/${projects[0].user_id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const projectInfo = response.data;
                // Update formData with fetched experience information
                setProjects(projectInfo.length > 0 ? projectInfo : [addNewProject()]);
      } else {
        console.log('Project information not found');
      }
    } catch (error) {
      console.log('This user is not registered', error);
    }
  }

  useEffect(() => {
    if (projects[0].user_id) {
      GetProjectInfo();
    }
  }, [projects[0].user_id]);

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Step 4: Project Details</h2>

      {projects.map((project, index) => (
        <div key={index}>
          <label>
            Title (FR)
            <input
              type="text"
              name="title_fr"
              value={project.title_fr}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Title (EN)
            <input
              type="text"
              name="title_en"
              value={project.title_en}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Description (FR)
            <textarea
              name="description_fr"
              value={project.description_fr}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Description (EN)
            <textarea
              name="description_en"
              value={project.description_en}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Image Path
            <input
              type="file"
              name="image_path"
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Video URL
            <input
              type="url"
              name="video_url"
              value={project.video_url}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Project Link
            <input
              type="url"
              name="project_link"
              value={project.project_link}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Tags
            <input
              type="text"
              name="tags"
              value={project.tags}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Status
            <input
              type="text"
              name="status"
              value={project.status}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Technologies Used
            <input
              type="text"
              name="technologies_used"
              value={project.technologies_used}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Repository Link
            <input
              type="url"
              name="repository_link"
              value={project.repository_link}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Client Name
            <input
              type="text"
              name="client_name"
              value={project.client_name}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <hr />
        </div>
      ))}

      <button onClick={addNewProject}>Add New Project</button>

      <button onClick={() => SendData(projects, url)} disabled={loading}>
        {loading ? 'Next...' : 'Next'}
      </button>
    </div>
  );
};

export default Step4;
