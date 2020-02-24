
export const selectRandomItem = (items) => (
  items[Math.floor(Math.random() * items.length)]
);

export const findIndex = (array, winner) => (
  array.findIndex((item) => item.id === winner.id)
);

export const formatDate = (date) => {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const time = date.toLocaleTimeString(
    'en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    },
  );

  return `${day} ${monthNames[monthIndex]} ${year} ${time}`;
};

export default {
  selectRandomItem,
  findIndex,
};
