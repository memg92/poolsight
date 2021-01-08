export const dateFormatter = (filterDate) => {
  const date = new Date(filterDate);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
