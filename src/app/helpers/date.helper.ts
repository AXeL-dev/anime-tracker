
const dayMilliseconds = 86400000;

export const frenchDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export const frenchMonths = {
  'janvier': 1,
  'février': 2,
  'mars': 3,
  'avril': 4,
  'mai': 5,
  'juin': 6,
  'juillet': 7,
  'août': 8,
  'septembre': 9,
  'octobre': 10,
  'novembre': 11,
  'décembre': 12
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

export const isInToday = (inputDate: Date) => {
  const today = now();
  return dateOnly(today) === dateOnly(inputDate);
};

export const sameDates = (date1: Date|number|string, date2: Date|number|string, defaultDate?: Date|number|string) => {
  const dates = {
    date1: date1 ? dateOnly(new Date(date1)) : defaultDate,
    date2: date2 ? dateOnly(new Date(date2)) : defaultDate,
  };
  return dates.date1 === dates.date2;
};
