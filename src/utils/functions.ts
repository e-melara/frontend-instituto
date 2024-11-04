import moment from 'moment';

const filterNumeric = (value: string | number, toFixedNumber = 2, last = false) => {
  if(last) {
    const numero = parseFloat(value.toString())
    return (Math.round(numero * 10) / 10).toFixed(1);
  } else {
    return parseFloat(value?.toString()).toFixed(toFixedNumber);
  }
};

const timeAgo = (date: string) => {
  return moment(date).format('DD/MM/YYYY HH:mm')
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