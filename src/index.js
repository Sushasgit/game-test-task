import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

import './style.css';


const App = () => (
    <div className="container">
        <div className="column">
            <Game />
        </div>
    </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
