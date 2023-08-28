const getDatesByYear = (year) => {
  const presentYear = new Date().getFullYear();
  let endDate = "";
  let startDate = "";
  if (presentYear === year) {
    endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    startDate = new Date(presentYear, 0, 1);
  } else {
    endDate = new Date(year, 11, 31);
    startDate = new Date(year, 0, 1);
  }

  return { start: startDate, end: endDate };
};
export default getDatesByYear;
