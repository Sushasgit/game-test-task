const BASE_URL = 'https://starnavi-frontend-test-task.herokuapp.com/';

export const getGameSettings = () => (
  fetch(`${BASE_URL}game-settings`)
);

export const getGameWinners = () => (
  fetch(`${BASE_URL}winners`)
);

export const setGameWinner = (options) => (
  fetch(`${BASE_URL}winners`, options)
);

export default {
  getGameSettings,
  getGameWinners,
  setGameWinner,
};
