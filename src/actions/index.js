import { getGameWinners } from '../api';

export function getWinners(payload) {
  return { type: 'GET_WINNERS', payload };
}

export function fetchWinners() {
  return function (dispatch) {
    return getGameWinners()
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error),
      )
      .then((json) => {
        dispatch(getWinners(json));
      });
  };
}
