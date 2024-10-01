
import React from 'react';

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div>
      <h2>Step 2: Contact Details</h2>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step2;