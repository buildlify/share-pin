const getNextMonthsDate = (): string => {
  return new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
};

export default getNextMonthsDate;
