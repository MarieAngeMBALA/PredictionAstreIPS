import React from 'react';
import WeightSlider from './Slider';

const Hypothesis = ({ hypothesis, index, updateHypothesis }) => {
  const handleChange = (field, value) => {
    updateHypothesis(index, { ...hypothesis, [field]: parseFloat(value) });
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        width: '250px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <h4>{hypothesis.description}</h4>
      <WeightSlider
        label="ASTRE"
        value={hypothesis.ASTRE}
        onChange={(e) => handleChange('ASTRE', e.target.value)}
        min={0}
        max={5}
        step={0.1}
      />
      <WeightSlider
        label="IPS"
        value={hypothesis.IPS}
        onChange={(e) => handleChange('IPS', e.target.value)}
        min={0}
        max={5}
        step={0.1}
      />
      <WeightSlider
        label="Importance"
        value={hypothesis.importance}
        onChange={(e) => handleChange('importance', e.target.value)}
        min={0}
        max={3}
        step={0.1}
      />
    </div>
  );
};

export default Hypothesis;

