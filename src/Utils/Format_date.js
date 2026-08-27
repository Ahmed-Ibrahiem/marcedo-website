// export const use_format_date_in_reviews = (date) => {
//   const current_data = new Date();
//   const review_date = new Date(date);
//   const diff = current_data - review_date;

//   const mini = diff / (1000 * 60);
//   const hour = diff / (1000 * 60 * 60);
//   const day = diff / (1000 * 60 * 60 * 24);
//   const month = diff / (1000 * 60 * 60 * 24 * 30);
//   const years = diff / (1000 * 60 * 60 * 22 * 30 * 12);

//   if (mini < 60) {
//     return `${Math.floor(mini)} min`;
//   } else if (mini >= 60 && hour < 24) {
//     return `${Math.floor(hour)} h `;
//   } else if (hour >= 24 && day < 30) {
//     if (hour < 48) {
//       return "Yesterday";
//     }
//     return `${Math.floor(day)} d`;
//   } else if (day >= 30 && month < 12) {
//     return `${Math.floor(month)} mo`;
//   } else if (month >= 12) {
//     if (Math.floor(years) <= 1) {
//       return `Last Year`;
//     }
//     return `${Math.floor(years)} y`;
//   }
// };

export const formate_date = (date) => {
  const formatedDate = new Date(date); // Convert string to Date object
  return formatedDate.toLocaleDateString("en", {
    month: "short", // Short month name (e.g., Jan, Feb)
    day: "numeric", // Day of the month
    year: "numeric", // Full year
  });
};

export const formateTimestampToDateAndTime = (timestamp) => {
  if (!timestamp) {
    return {
      date: "",
      time: "",
    };
  }

  const date = new Date(timestamp.seconds * 1000);

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date),

    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date),
  };
};
