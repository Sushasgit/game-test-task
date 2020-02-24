import React from 'react';

import LeaderBoard from '../LeaderBoard';
import GameField from '../GameField';
import { getGameSettings } from '../../api';

import styles from './game.module.css';

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
        <div className={styles.flex}>
            <GameField gameSettings={gameSettings} />
            <LeaderBoard />
        </div>
    );
  }
}

export default Game;
