
import React from 'react';

const Step3 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div>
      <h2>Step 3: Address Details</h2>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={values.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step3;