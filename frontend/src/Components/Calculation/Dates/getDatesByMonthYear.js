const getDatesByMonthYear = (year, month) => {
  const date = new Date(year, month, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);
  return {
    start: new Date(year, month, 1),
    end: date,
  };
};
export default getDatesByMonthYear;
