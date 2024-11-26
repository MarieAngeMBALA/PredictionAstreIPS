import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ChartComponent from './components/ChartComponent';
import Parameters from './components/Parametres';
import HypothesesTable from './components/TableauHypotheses'; 
import { defaultHypotheses, defaultWeights, obtenirPoidsQuestion } from './utils/ValeursParDefaut';


const App = () => {
 const [chartData, setChartData] = useState(null);
 const [data, setData] = useState([]);
 const [questions, setQuestions] = useState([]);


 const [hypotheses, setHypotheses] = useState(defaultHypotheses);
 const [weights, setWeights] = useState(defaultWeights);

 const [activeFilter, setActiveFilter] = useState(null);


 const handleLegendClick = (label) => {
  if (label === 'Score ASTRE') {
    setActiveFilter((prevFilter) => (prevFilter === 'ASTRE' ? null : 'ASTRE'));
  } else if (label === 'Score IPS') {
    setActiveFilter((prevFilter) => (prevFilter === 'IPS' ? null : 'IPS'));
  }
};

// Fonction pour filtrer le graphe en ASTRE et IPS
const filteredData = chartData
    ? {
        ...chartData,
        datasets: chartData.datasets.map((dataset) => {
          if (activeFilter === 'ASTRE') {
            return {
              ...dataset,
              data: dataset.data.map((value, index) =>
                dataset.label === 'Score ASTRE' && chartData.datasets[0].data[index] > chartData.datasets[1].data[index]
                  ? value
                  : null
              ),
            };
          } else if (activeFilter === 'IPS') {
            return {
              ...dataset,
              data: dataset.data.map((value, index) =>
                dataset.label === 'Score IPS' && chartData.datasets[0].data[index] <= chartData.datasets[1].data[index]
                  ? value
                  : null
              ),
            };
          } else {
            return dataset; 
          }
        }),
      }
    : null;


 // Fonction pour recalculculer les scores
 const calculerScores = () => {
   const newData = [...data];
   newData.forEach((row) => {
     row.score_ASTRE = 0;
     row.score_IPS = 0;
   });


   // Condition pour chaque hypothèse
   hypotheses.forEach((hypothesis) => {
     newData.forEach((row) => {
       const student_num = row[questions[0]];

       // Hypothèse 1
       if (hypothesis.description === 'hypothèse 1' && row[questions[6]] === 'Prépa BL') {
         const poids = obtenirPoidsQuestion(questions[6], questions, weights);
         row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
         row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
       }

       // Hypothèse 2
       else if (hypothesis.description === 'hypothèse 2') {
         const condition1 = ['Aventurier', 'Autonome'].includes(row[questions[10]]) ||
                            ['Réseau & Telecom', 'Cybersécurité'].includes(row[questions[7]]);
         const condition2 = row[questions[4]] === '24h du code';
         if (condition1 && condition2) {
           const poids = (
             obtenirPoidsQuestion(questions[10], questions, weights) +
             obtenirPoidsQuestion(questions[7], questions, weights) +
             obtenirPoidsQuestion(questions[4], questions, weights)
           ) / 3;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 3
       else if (hypothesis.description === 'hypothèse 3') {
         const condition1 = ['Fablab', 'IEEE Xtreme'].includes(row[questions[4]]) ||
                            row[questions[10]] === 'Pragmatique' ||
                            row[questions[16]] === 'Outils de bricolage';
         const condition2 = ['Thales', 'Schneider Electric'].includes(row[questions[9]]) ||
                            row[questions[17]] === 'Linux' ||
                            row[questions[5]] === 'Sciences de l’ingénieur';
         if (condition1 && condition2) {
           const poids = (
             obtenirPoidsQuestion(questions[4], questions, weights) +
             obtenirPoidsQuestion(questions[10], questions, weights) +
             obtenirPoidsQuestion(questions[16], questions, weights) +
             obtenirPoidsQuestion(questions[9], questions, weights) +
             obtenirPoidsQuestion(questions[17], questions, weights) +
             obtenirPoidsQuestion(questions[5], questions, weights)
           ) / 6;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 4
       else if (hypothesis.description === 'hypothèse 4') {
         const condition1 = ['EnsimElec', 'Mesure physique', 'GEII', 'Arduino/Raspberry Pi', 'STMicroelectronics']
           .some((val) => Object.values(row).includes(val));
         if (condition1) {
           const poids = (
             obtenirPoidsQuestion(questions[4], questions, weights) +
             obtenirPoidsQuestion(questions[7], questions, weights) +
             obtenirPoidsQuestion(questions[16], questions, weights) +
             obtenirPoidsQuestion(questions[9], questions, weights)
           ) / 4;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 5
       else if (hypothesis.description === 'hypothèse 5') {
         const condition1 = ['Jamais', 'Artistique', 'Collaboratif', 'La Kfet', 'Les copains', 'Pas le choix', 'SVT', 'SES', 'Langues/Littérature']
           .some((val) => Object.values(row).includes(val));
         if (condition1) {
           const poids = (
             obtenirPoidsQuestion(questions[18], questions, weights) +
             obtenirPoidsQuestion(questions[10], questions, weights) +
             obtenirPoidsQuestion(questions[3], questions, weights) +
             obtenirPoidsQuestion(questions[5], questions, weights)
           ) / 4;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 6
       else if (hypothesis.description === 'hypothèse 6') {
         if (row[questions[10]] === 'Solitaire' &&
             (row[questions[3]] === 'Les TP' || row[questions[5]] === 'STI2D')) {
           const poids = (
             obtenirPoidsQuestion(questions[10], questions, weights) +
             obtenirPoidsQuestion(questions[3], questions, weights) +
             obtenirPoidsQuestion(questions[5], questions, weights)
           ) / 3;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 7
       else if (hypothesis.description === 'hypothèse 7') {
         if (row[questions[20]] === 'Oui' || row[questions[8]] === 'Oui') {
           const poids = (
             obtenirPoidsQuestion(questions[20], questions, weights) +
             obtenirPoidsQuestion(questions[8], questions, weights)
           ) / 2;
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 8
       else if (hypothesis.description === 'hypothèse 8') {
         if (row[questions[11]] === 'Assembleur' &&
             ['C', 'Shell / Bash'].includes(row[questions[11]])) {
           const poids = obtenirPoidsQuestion(questions[11], questions, weights);
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

       // Hypothèse 9
       else if (hypothesis.description === 'hypothèse 9') {
         const poids = obtenirPoidsQuestion(questions[12], questions, weights);
         const reponsesReseauxSociaux = row[questions[12]];
         if (reponsesReseauxSociaux) {
           const reseaux = reponsesReseauxSociaux.split(',').map((r) => r.trim());
           if (reseaux.length > 4) {
             row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
             row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
           }
         }
       }

       // Hypothèse 10
       else if (hypothesis.description === 'hypothèse 10') {
         if (row[questions[2]] === 'Oui') {
           const poids = obtenirPoidsQuestion(questions[2], questions, weights);
           row.score_ASTRE += hypothesis.ASTRE * hypothesis.importance * poids;
           row.score_IPS += hypothesis.IPS * hypothesis.importance * poids;
         }
       }

     });
   });


   // Calculer les prédictions
   newData.forEach((row) => {
     row.prediction = row.score_ASTRE > row.score_IPS ? 'ASTRE' : 'IPS';
   });


   // Mettre à jour les données pour le graphique
   setChartData({
    labels: newData.map((row) => row[questions[0]]),
    datasets: [
      {
        label: 'Score ASTRE',
        data: newData.map((row) => row.score_ASTRE),
        backgroundColor: 'brown',
      },
      {
        label: 'Score IPS',
        data: newData.map((row) => row.score_IPS),
        backgroundColor: 'orange',
      },
    ],
  });
};


 // Fonction pour réinitialiser les poids et les hypothèses par défaut 
 const resetValues = () => {
   setHypotheses(defaultHypotheses);
   setWeights(defaultWeights);
   setActiveFilter(null); 
   calculerScores();
 };


 // Charger le fichier CSV
 useEffect(() => {
   Papa.parse('/assets/reponsesEtudiants.csv', {
     download: true,
     header: true,
     complete: (results) => {
       const parsedData = results.data;
       if (!parsedData.length) {
         return;
       }
       setData(parsedData);
       setQuestions(Object.keys(parsedData[0]));
     },
   });
 }, []);


 // Recalculer les scores après les modifications des sliders
 useEffect(() => {
   if (data.length && questions.length) {
     calculerScores();
   }
 }, [data, questions, hypotheses, weights]);


 return (
   <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
     <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>
      PREDICTION ASTRE - IPS
    </h2>

    <HypothesesTable hypotheses={defaultHypotheses} />

     <Parameters
       weights={weights}
       setWeights={setWeights}
       hypotheses={hypotheses}
       setHypotheses={setHypotheses}
     />
    
     <div style={{ position: 'relative', marginTop: '20px' }}>
        {/* Graphique */}
        <ChartComponent
          chartData={filteredData}
          activeFilter={activeFilter}
          handleLegendClick={handleLegendClick}
        />
        
        {/* Bouton Réinitialiser */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px 20px',
            backgroundColor: '#FF0000', 
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={resetValues}
        >
          Réinitialiser les scores
        </button>
      </div>
   </div>
 );
};


export default App;
