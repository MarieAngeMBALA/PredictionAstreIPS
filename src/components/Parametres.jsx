import React from 'react';
import WeightSlider from './Slider';
import Hypothesis from './Hypotheses';

const Parameters = ({
  weights,
  setWeights,
  hypotheses,
  setHypotheses,
}) => {
  const updateHypothesis = (index, updatedHypothesis) => {
    const newHypotheses = [...hypotheses];
    newHypotheses[index] = updatedHypothesis;
    setHypotheses(newHypotheses);
  };

  return (
    <div>
      <h2>Paramètres</h2>
      <div>
        <h3>Poids des questions</h3>
        <WeightSlider
          label="Validation Directe"
          value={weights.validation_directe}
          onChange={(e) =>
            setWeights({ ...weights, validation_directe: parseFloat(e.target.value) })
          }
          min={0}
          max={1}
          step={0.1}
        />
        <WeightSlider
          label="Confirmation"
          value={weights.confirmation}
          onChange={(e) =>
            setWeights({ ...weights, confirmation: parseFloat(e.target.value) })
          }
          min={0}
          max={1}
          step={0.1}
        />
        <WeightSlider
          label="Complémentaire"
          value={weights.complementaire}
          onChange={(e) =>
            setWeights({ ...weights, complementaire: parseFloat(e.target.value) })
          }
          min={0}
          max={1}
          step={0.1}
        />
      </div>

      <h3>Hypothèses</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {hypotheses.map((hypothesis, index) => (
          <Hypothesis
            key={index}
            hypothesis={hypothesis}
            index={index}
            updateHypothesis={updateHypothesis}
          />
        ))}
      </div>
    </div>
  );
};

export default Parameters;
