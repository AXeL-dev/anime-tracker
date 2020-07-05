
const dayMilliseconds = 86400000;

export const frenchDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const frenchMonths = {
  'Janvier': 1,
  'Février': 2,
  'Mars': 3,
  'Avril': 4,
  'Mai': 5,
  'Juin': 6,
  'Juillet': 7,
  'Août': 8,
  'Septembre': 9,
  'Octobre': 10,
  'Novembre': 11,
  'Décembre': 12
};

export const now = () => {
  return new Date();
};

export const today = () => {
  return now().toISOString().slice(0, 10);
};

export const yesterday = () => {
  return new Date(now().getTime() - (1*dayMilliseconds)).toISOString().slice(0, 10);
};
