
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

export const dateOnly = (date: Date) => {
  return date.setHours(0, 0, 0, 0);
};

export const today = (asString: boolean = false): any => {
  const today = now();
  return asString ? today.toISOString().slice(0, 10) : dateOnly(today);
};

export const yesterday = (asString: boolean = false): any => {
  return dateBefore(1, asString);
};

export const dateBefore = (numberOfDays: number, asString: boolean = false): any => {
  const date = new Date(now().getTime() - (numberOfDays * dayMilliseconds));
  return asString ? date.toISOString().slice(0, 10) : dateOnly(date);
};
