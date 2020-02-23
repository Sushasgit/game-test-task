import React from 'react';

import classNames from 'classnames';

const Field = ({ game, clickedItem }) => (
  game.map((item, index) => (
      <button
        type="button"
        key={item.id}
        disabled={item.disabled}
        onClick={() => {
          clickedItem(item);
        }}
        className={classNames('cell', {
          active: !item.disabled,
          failed: item.winner === 'compoter',
          win: item.winner === 'user',
        })}
      >
          {index}
      </button>
  ))
);

export default Field;
