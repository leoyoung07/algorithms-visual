import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Route, Router } from 'react-router';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Sort from './Sort';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/sort" component={Sort}/>
  </Router>
), document.getElementById('root') as HTMLElement);
registerServiceWorker();
