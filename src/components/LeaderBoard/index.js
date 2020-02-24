import React from 'react';
import { connect } from 'react-redux';

import styles from './board.module.css';

const LeaderBoard = ({ winners }) => (
    <div className={styles.board}>
        <h2 className={styles.boardTitle}>Leader Board</h2>
        <ul className={styles.boardList}>
            {winners.map((winner) => (
                <li className={styles.boardItem} key={winner.id}>
                    <span>
                        {winner.winner}
                    </span>
                    <span>
                        {winner.date}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

const mapStateToProps = (state) => ({ winners: state.winners });

export default connect(mapStateToProps, null)(LeaderBoard);
