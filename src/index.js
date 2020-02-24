import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './components/Game';
import store from './store';

import './style.css';

const App = () => (
    <Provider store={store}>
        <Game />
    </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
