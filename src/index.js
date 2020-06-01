import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/selectCSS.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';

import * as serviceWorker from './javascript/serviceWorker';

import "react-datepicker/dist/react-datepicker.css";
import App from "./App";


ReactDOM.render(<App/>, document.getElementById('root'));

/*
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><TestNode/></Provider>, document.getElementById('testNode'));
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
