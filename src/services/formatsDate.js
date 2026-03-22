export const formate_date = (date) => {
  const formatedDate = new Date(date); // Convert string to Date object
  return formatedDate.toLocaleDateString("en", {
    month: "short", // Short month name (e.g., Jan, Feb)
    day: "numeric", // Day of the month
    year: "numeric", // Full year
  });
};
