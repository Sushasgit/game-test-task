import React from 'react';
import uid from 'uid';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { setGameWinner } from '../../api';
import { selectRandomItem, findIndex, formatDate } from '../../utils';
import Message from '../Message';
import Select from '../Select';
import Field from '../Field';
import { fetchWinners } from '../../actions';

import styles from './field.module.css';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      userScore: 0,
      userName: '',
      message: '',
      computerScore: 0,
      isPlaying: false,
      level: {},
    };
    this.timer = null;
  }

  componentDidMount() {
    const { getWinner } = this.props;
    getWinner();
  }

  setDefaultSettings = () => {
    const { level } = this.state;
    const game = new Array(level.field ** 2)
      .fill()
      .map(() => ({ id: uid(), winner: null, disabled: true }));
    this.setState({ game });
  };

  startGame = (e) => {
    e.persist();
    e.preventDefault();
    const { isPlaying, userName } = this.state;
    if (!isPlaying && userName) {
      this.setState({
        isPlaying: true,
      }, () => {
        this.nextGameStep();
      });
    }
  };

  nextGameStep = () => {
    const { game, level } = this.state;
    const gameArray = game.filter((single) => !single.winner);
    const randomItem = selectRandomItem(gameArray);
    if (randomItem && !randomItem.winner) {
      randomItem.disabled = false;
      const newState = { ...this.state };
      this.setState({
        randomItem,
        ...newState,
      });
    }
    this.timer = setTimeout(() => {
      randomItem.winner = 'computer';
      randomItem.disabled = true;
      this.setState((prevState) => ({
        ...prevState,
        computerScore: prevState.computerScore + 1,
        randomItem,
      }), () => {
        this.checkResults();
      });
    }, level.delay);

    return () => {
      clearTimeout(this.timer);
    };
  };

  checkResults = () => {
    const {
      userScore,
      computerScore,
      userName,
      level,
    } = this.state;

    const res = Math.round(level.field ** 2 / 2);

    if (userScore >= res || computerScore >= res) {
      let message;
      userScore >= res ? message = `${userName} wins` : message = 'Computer Wins';
      this.setState({
        isPlaying: false,
        message,
      }, () => {
        const options = {
          body: JSON.stringify({
            winner: userScore >= res ? userName : 'Computer',
            date: formatDate(new Date()),
          }),
        };
        setGameWinner(options)
          .then((response) => response.json())
          .then(() => {
            const { getWinner } = this.props;
            getWinner();
          });
      });
    } else {
      this.nextGameStep();
    }
  };

  clickedItem = (itemWin) => {
    const { game } = this.state;
    const winner = itemWin;
    winner.winner = 'user';
    winner.disabled = true;

    game.splice(findIndex(game, winner), 1, winner);
    this.setState(
      (prevState) => ({
        ...prevState,
        userScore: prevState.userScore + 1,
        game,
      }),
      () => {
        clearTimeout(this.timer);
        this.checkResults();
      },
    );
  };

  handleChange = (e) => {
    const { gameSettings } = this.props;
    this.setState({
      level: gameSettings[e.target.value],
    }, () => {
      this.setDefaultSettings();
    });
  }

  handleNameChange = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  resetGame = (e) => {
    e.persist();
    e.preventDefault();
    this.setDefaultSettings();
    this.setState({
      userScore: 0,
      message: '',
      computerScore: 0,
      isPlaying: false,
    }, () => {
      this.startGame(e);
    });
  }

  render() {
    const { gameSettings } = this.props;
    const {
      level,
      game,
      isPlaying,
      message,
    } = this.state;
    return (
        <div className={styles.gameField}>
            <form className={styles.form} onSubmit={(e) => { this.startGame(e); }}>
                {
                    gameSettings ? (
                        <Select
                          options={gameSettings}
                          handleChange={this.handleChange}
                          disabled={isPlaying}
                        />
                    ) : null
                }
                <input
                  className="input"
                  placeholder="Enter your name"
                  required
                  type="text"
                  onChange={this.handleNameChange}
                />

                {
                    message ? (
                        <button
                          type="button"
                          className="btn"
                          onClick={(e) => { this.resetGame(e); }}
                        >
                            Play Again
                        </button>
                    ) : (
                        <button
                          className="btn"
                          disabled={!game.length && !isPlaying}
                          type="submit"
                        >
                            Play
                        </button>
                    )
                }
            </form>
            <Message message={message} />
            <div className={classNames('board', {
              easy: level.field === 5,
              normal: level.field === 10,
              hard: level.field === 15,
            })}
            >
                {
                    game && isPlaying
                      ? <Field clickedItem={this.clickedItem} game={game} /> : null
                }
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({ winners: state.winners });
const mapDispatchToProps = { getWinner: fetchWinners };

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
