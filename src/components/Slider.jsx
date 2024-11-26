import React from 'react';

const WeightSlider = ({ label, value, onChange, min = 0, max = 5, step = 0.1 }) => {
  return (
    <label style={{ display: 'block', marginBottom: '10px' }}>
      {label} :
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{ margin: '0 10px' }}
      />
      {value}
    </label>
  );
};

export default WeightSlider;
