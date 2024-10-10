import React, { useState, useEffect } from "react"; 
import axios from "axios";

const url = "educations";
const apiUrl = process.env.REACT_APP_API_URL;

const Step2 = ({ SendData, loading, error }) => {
    // State for managing multiple education entries
    const [formData, setFormData] = useState([{
        institution_name: "",
        description_fr: "",
        description_en: "",
        address_fr: "",
        address_en: "",
        start_date: "",
        end_date: "",
        is_current: 0,
        user_id: sessionStorage.getItem("id"),
    }]);

    // Fetch education info when the component mounts
    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        if (userId) {
            GetEducationInfo(userId); // Only call if user_id is set
        }
    }, []); // Runs once on mount

    async function GetEducationInfo(userId) {
        try {
            const response = await axios.get(`${apiUrl}/educations/${userId}`, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                const educationInfo = response.data;
                // Update formData with fetched education information
                setFormData(educationInfo.length > 0 ? educationInfo : [getInitialEducation(userId)]);
            } else {
                console.log("Education information not found");
            }
        } catch (error) {
            console.log("This user is not registered", error);
        }
    }

    const getInitialEducation = (userId) => ({
        institution_name: "",
        description_fr: "",
        description_en: "",
        address_fr: "",
        address_en: "",
        start_date: "",
        end_date: "",
        is_current: 0,
        user_id: userId,
    });

    // Handle input changes for specific education entry
    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index][name] = type === "checkbox" ? (checked ? 1 : 0) : value;
        setFormData(updatedFormData);
    };

    // Add new education form
    const addEducationForm = () => {
        const userId = sessionStorage.getItem("id");
        setFormData([...formData, getInitialEducation(userId)]);
    };

    return (
        <div className="Education" id="education">
            {error && <div className="alert alert-danger">{error}</div>}
            <h2>Step 2: Education Details</h2>

            {formData.map((education, index) => (
                <div key={index} id={`div-education-${index}`}>
                    <label>
                        Institution Name
                        <input
                            type="text"
                            name="institution_name"
                            value={education.institution_name}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Description (FR)
                        <textarea
                            name="description_fr"
                            value={education.description_fr}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Description (EN)
                        <textarea
                            name="description_en"
                            value={education.description_en}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Address (FR)
                        <input
                            type="text"
                            name="address_fr"
                            value={education.address_fr}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Address (EN)
                        <input
                            type="text"
                            name="address_en"
                            value={education.address_en}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Start Date
                        <input
                            type="date"
                            name="start_date"
                            value={education.start_date}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        End Date
                        <input
                            type="date"
                            name="end_date"
                            value={education.end_date}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>

                    <label>
                        Currently Studying
                        <input
                            type="checkbox"
                            name="is_current"
                            checked={education.is_current === 1}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </label>
                </div>
            ))}

            <p onClick={addEducationForm}>ADD MORE EDUCATION</p>

            <button
                onClick={() => {
                    SendData(formData, url);
                }}
                disabled={loading}
            >
                {loading ? "Next..." : "Next"}
            </button>
        </div>
    );
};

export default Step2;
