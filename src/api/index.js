const BASE_URL = 'https://starnavi-frontend-test-task.herokuapp.com/';

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const getGameSettings = () => (
  fetch(`${BASE_URL}game-settings`)
);

export const getGameWinners = () => (
  fetch(`${BASE_URL}winners`)
);

export const setGameWinner = (options) => (
  fetch(`${BASE_URL}winners`, { ...POST_OPTIONS, ...options })
);

export default {
  getGameSettings,
  getGameWinners,
  setGameWinner,
};
