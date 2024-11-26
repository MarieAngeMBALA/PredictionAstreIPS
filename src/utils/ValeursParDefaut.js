export const defaultHypotheses = [
  {
    description: 'hypothèse 1',
    ASTRE: 0,
    IPS: 5,
    importance: 3,
    customText: '1. Si un étudiant a fait Prépa BL',
  },
  {
    description: 'hypothèse 2',
    ASTRE: 2,
    IPS: 3,
    importance: 1,
    customText: '2. Si un étudiant est Aventurier/ Autonome /Réseau télécom/ Cybersécurité ET a choisi 24h du code (Q5, Q11, Q8)',
  },
  {
    description: 'hypothèse 3',
    ASTRE: 3,
    IPS: 2,
    importance: 2,
    customText: '3. Si un étudiant a choisi Fablab/ IEEE-Xtreme/ Pragmatique/ Outils de bricolage ET Thales/ Schneider Electric/ Linux/Science de l’ingénieur (Q5, Q11, Q17, Q18,Q6)',
  },
  {
    description: 'hypothèse 4',
    ASTRE: 5,
    IPS: 0,
    importance: 2.5,
    customText: '4. Si un étudiant choisi EnsimElec/ Arduino/ GEII/ Mesure physique/ STMicroelectronics  (Q5, Q17, Q8, Q10)',
  },
  {
    description: 'hypothèse 5',
    ASTRE: 0,
    IPS: 5,
    importance: 3,
    customText: '5. Si un étudiant ne code jamais/ Artistique/ Collaboratif/ KFET/ Copains/ Pas le choix / SVT/ SES/ Langues et Littérature (Q19, Q4, Q6, Q11)',
  },
  {
    description: 'hypothèse 6',
    ASTRE: 4,
    IPS: 1,
    importance: 2,
    customText: '6. Si un étudiant est Solitaire ET il vient à l’école pour les TP/STI2D(Q11, Q4)',
  },
  {
    description: 'hypothèse 7',
    ASTRE: 1,
    IPS: 4,
    importance: 2,
    customText: '7. Si un étudiant envisage un travail sans code et programmation ou Oui envisage l\'auto entreprenariat (Q21,Q9)',
  },
  {
    description: 'hypothèse 8',
    ASTRE: 4,
    IPS: 1,
    importance: 2,
    customText: '8. Si un étudiant choisi comme langage Assembleur ET C/ Bash/ Shell (Q12)',
  },
  {
    description: 'hypothèse 9',
    ASTRE: 0,
    IPS: 5,
    importance: 3,
    customText: '9. Si un étudiant choisi plus de 4 réseaux sociaux (Q13)',
  },
  {
    description: 'hypothèse 10',
    ASTRE: 4,
    IPS: 1,
    importance: 2,
    customText: '10. Si l’étudiant savait déjà ce qu’il voulait faire (Q3)',
  },
];

export const defaultWeights = {
  validation_directe: 0.4,
  confirmation: 0.5,
  complementaire: 0.1,
};

// Fonction pour obtenir le poids des questions
export const obtenirPoidsQuestion = (question, questions, weights) => {
  const questions_validation_directe = new Set([questions[4], questions[8], questions[10], questions[16], questions[20]]);
  const questions_confirmation = new Set([questions[2], questions[5], questions[3], questions[7], questions[9], questions[11], questions[17], questions[18]]);
  const questions_complementaires = new Set([questions[6], questions[12], questions[15], questions[19]]);

  if (questions_validation_directe.has(question)) return weights.validation_directe;
  if (questions_confirmation.has(question)) return weights.confirmation;
  if (questions_complementaires.has(question)) return weights.complementaire;
  return 1;
};

