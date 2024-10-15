import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'experiences';
const apiUrl = process.env.REACT_APP_API_URL;

const Step3 = ({ SendData, loading, error }) => {
    // State for managing multiple experience entries
    const [formData, setFormData] = useState([{
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
    }]);

    // Fetch experience info when the component mounts
    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        if (userId) {
            GetExperienceInfo(userId); // Only call if user_id is set
        }
    }, []);

    async function GetExperienceInfo(userId) {
        try {
            const response = await axios.get(`${apiUrl}/experiences/${userId}`, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                const experienceInfo = response.data;
                // Update formData with fetched experience information
                setFormData(experienceInfo.length > 0 ? experienceInfo : [getInitialExperience(userId)]);
            } else {
                console.log('Experience information not found');
            }
        } catch (error) {
            console.log('This user is not registered', error);
        }
    }

    const getInitialExperience = (userId) => ({
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
        user_id: userId,
    });

    // Handle input changes for specific experience entry
    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index][name] = type === 'checkbox' ? (checked ? 1 : 0) : value;
        setFormData(updatedFormData);
    };

    // Add new experience form
    const addExperienceForm = () => {
        const userId = sessionStorage.getItem("id");
        setFormData([...formData, getInitialExperience(userId)]);
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <h2>Step 3: Experience Details</h2>

            {formData.map((experience, index) => (
                <div key={index} id={`div-experience-${index}`}>
                    <label>
                        Company Name
                        <input
                            type="text"
                            name="company_name"
                            value={experience.company_name}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Role
                        <input
                            type="text"
                            name="role"
                            value={experience.role}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Role Description (FR)
                        <textarea
                            name="role_description_fr"
                            value={experience.role_description_fr}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Role Description (EN)
                        <textarea
                            name="role_description_en"
                            value={experience.role_description_en}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Address (FR)
                        <input
                            type="text"
                            name="address_fr"
                            value={experience.address_fr}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Address (EN)
                        <input
                            type="text"
                            name="address_en"
                            value={experience.address_en}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Start Date
                        <input
                            type="date"
                            name="start_date"
                            value={experience.start_date}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        End Date
                        <input
                            type="date"
                            name="end_date"
                            value={experience.end_date}
                            onChange={(e) => handleChange(index, e)}
                            disabled={experience.is_current} // Disable if currently employed
                        />
                    </label>

                    <label>
                        Currently Employed
                        <input
                            type="checkbox"
                            name="is_current"
                            checked={experience.is_current === 1}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Company Website
                        <input
                            type="url"
                            name="company_website"
                            value={experience.company_website}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Skills Acquired
                        <textarea
                            name="skills_acquired"
                            value={experience.skills_acquired}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>
                </div>
            ))}

            <p onClick={addExperienceForm}>ADD MORE EXPERIENCE</p>

            <button
                onClick={() => {
                    SendData(formData, url);
                }}
                disabled={loading}
            >
                {loading ? 'Next...' : 'Next'}
            </button>
        </div>
    );
};

export default Step3;
