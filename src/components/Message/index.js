import React from 'react';

import styles from './message.module.css';

const Message = ({ message }) => (
    <p className={styles.message}>
        {message}
    </p>
);

export default Message;
