function getDateString(date) {
  const day = date
    .getUTCDate()
    .toString()
    .padStart(2, 0);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, 0);
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
}

export default getDateString;
