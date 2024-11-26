import React from 'react';

const HypothesesTable = ({ hypotheses }) => {
  return (
    <div style={containerStyle}>
      <h3 style={tableTitleStyle}>Tableau Récapitulatif des Hypothèses : '/' = OU </h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Description des Hypothèses</th>
            <th style={tableHeaderStyle}>Pondération ASTRE (/5)</th>
            <th style={tableHeaderStyle}>Pondération IPS (/5)</th>
            <th style={tableHeaderStyle}>Dégré d'Importance (/3)</th>
          </tr>
        </thead>
        <tbody>
          {hypotheses.map((hypothesis, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{hypothesis.customText}</td>
              <td style={tableCellStyle}>{hypothesis.ASTRE}</td>
              <td style={tableCellStyle}>{hypothesis.IPS}</td>
              <td style={tableCellStyle}>{hypothesis.importance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles pour le tableau
const containerStyle = {
  marginTop: '20px',
  overflowX: 'auto',
};

const tableTitleStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '400px',
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
};

export default HypothesesTable;
