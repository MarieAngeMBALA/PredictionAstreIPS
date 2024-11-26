import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './ChartComponent.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ chartData, activeFilter, handleLegendClick }) => {
  return (
    <div className="chart-container">
      <br />
      <h1 className="chart-title">Scores des Étudiants</h1> 
      <p>La couleur marron représente le score des étudiants pour la spécialité ASTRE et la couleur Orange représente les scores des étudiants pour la spécialité IPS</p>
      <p>Pour voir uniquement les étudiants ASTRE, Clique juste sur 'Etidiants ASTRE' dans la légende, et vice versa pour IPS</p>
      
      {/* Légende personnalisée */}
      <div className="custom-legend" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div
          className={`legend-item ${activeFilter === 'ASTRE' ? 'active' : ''}`}
          onClick={() => handleLegendClick('Score ASTRE')}
        >
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: 'brown',
              marginRight: '8px',
            }}
          ></span>
         Etudiants ASTRE
        </div>
        <div
          className={`legend-item ${activeFilter === 'IPS' ? 'active' : ''}`}
          onClick={() => handleLegendClick('Score IPS')}
        >
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: 'orange',
              marginRight: '8px',
            }}
          ></span>
          Etudiants IPS
        </div>
      </div>
      
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false, 
              },
              tooltip: { enabled: true },
            },
            scales: {
              x: { title: { display: true, text: 'Numéros Étudiants' } },
              y: { title: { display: true, text: 'Scores' } },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
