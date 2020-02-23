import React from 'react';

import styles from './board.module.css';

const LeaderBoard = ({ winners }) => (
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
);

export default LeaderBoard;
