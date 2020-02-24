import React from 'react';
import LeaderBoard from '../LeaderBoard';
import { getGameSettings } from '../../api';
import GameField from '../GameField';

class Game extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      gameSettings: {},
    };
  }

  componentDidMount() {
    this.getSettings();
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

  render() {
    const { gameSettings } = this.state;
    return (
        <div>
            <GameField gameSettings={gameSettings} />
            <LeaderBoard />
        </div>
    );
  }
}

export default Game;
