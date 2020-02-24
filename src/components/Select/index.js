import React from 'react';

import styles from './select.module.css';

const Select = ({ options = {}, handleChange, disabled }) => (
    <select
      className={styles.select}
      defaultValue="Pick game mode"
      onChange={handleChange}
      disabled={disabled}
    >
        <option disabled value="Pick game mode">
            Pick game mode
        </option>
        {
            Object.keys(options).map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))
        }
    </select>
);

export default Select;
