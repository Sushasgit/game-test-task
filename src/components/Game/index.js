import React from 'react';
import LeaderBoard from '../LeaderBoard';
import { getGameSettings, getGameWinners } from '../../api';
import GameField from '../GameField';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      winners: [],
    };
  }

  componentDidMount() {
    this.getSettings();
    this.getWinners();
  }

  getSettings = () => {
    getGameSettings()
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gameSettings: data,
        });
      })
      .catch(() => console.log('error'));
  }

    getWinners = () => {
      getGameWinners()
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            winners: data,
          });
        });
    }

    render() {
      const { winners, gameSettings } = this.state;
      return (
          <div>
              <GameField gameSettings={gameSettings} />
              <LeaderBoard winners={winners} />
          </div>
      );
    }
}

export default Game;
