import moment from 'moment';

const filterNumeric = (value: string | number, toFixedNumber = 2) => {
  return parseFloat(value?.toString()).toFixed(toFixedNumber);
};

const timeAgo = (date: string) => {
  return moment(date).locale('es').fromNow();
}

const nameTransform = (name: string) => {
  return name
    .toLocaleUpperCase()
    .replace('_', ' ')
}

export {
  timeAgo,
  nameTransform,
  filterNumeric
}