import React from 'react';

import classNames from 'classnames';

const Field = ({ game, clickedItem }) => (
  game.map((item) => (
      <button
        type="button"
        aria-label="Button click"
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
      />
  ))
);

export default Field;
