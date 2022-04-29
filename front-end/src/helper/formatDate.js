const checkZero = (value) => {
  const intValue = Number(value);
  const vMax = 10;
  return intValue < vMax ? `0${intValue}` : intValue;
};

const formatDate = (saleDate) => {
  const date = new Date(saleDate);
  const day = checkZero(date.getDate());
  const month = checkZero(date.getMonth() + 1);
  const fullyear = date.getFullYear().toString();
  const year = fullyear;
  // const year = fullyear.slice(2);
  return `${day}/${month}/${year}`;
};

export default formatDate;
