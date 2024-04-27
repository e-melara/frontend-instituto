const filterNumeric = (value: string | number, toFixedNumber = 2) => {
  return parseFloat(value?.toString()).toFixed(toFixedNumber);
};

export {
  filterNumeric
}