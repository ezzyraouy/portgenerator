import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Confirmation from './Confirmation';
import Success from './Success';
import axios from 'axios';
import '../../style.css';
const apiUrl = process.env.REACT_APP_API_URL;
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   city: ''
  // });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === 'checkbox' ? (checked ? 1 : 0 ) : value,
  //   }));
  // };
  const handleSubmit = () => {
    // Handle form submission, e.g., send data to an API
    nextStep();
  };

  //Send Data
  const SendData  = async (formData,url) =>{
    try {
        const response = await axios.post(`${apiUrl}/${url}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 201) {
             console.log('done')
            nextStep()
        } else {
          setError(response.data.message || 'An error occurred ,Please try again.');
        }
    
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred. Please try again.');
        } else if (error.request) {
          setError('No response from server. Please try again.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false); 
      }
  }
//Get Data


  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} loading={loading} error={error} SendData={SendData}   />;
    case 2:
      return <Step2 nextStep={nextStep} loading={loading} error={error} SendData={SendData} prevStep={prevStep}   />;
    case 3:
      return <Step3 nextStep={nextStep} loading={loading} error={error} SendData={SendData} prevStep={prevStep}   />;
    case 4:
      return <Step4 nextStep={nextStep} loading={loading} error={error} SendData={SendData} prevStep={prevStep}   />;
    case 5:
      return <Step5 nextStep={nextStep} loading={loading} error={error} SendData={SendData} prevStep={prevStep}   />;
    case 6:
      return <Confirmation prevStep={prevStep}  handleSubmit={handleSubmit} />;
    case 7:
      return <Success />;
    default:
      return <Step1 nextStep={nextStep}   />;
  }
};

export default MultiStepForm;