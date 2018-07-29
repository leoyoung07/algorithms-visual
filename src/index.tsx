import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Route, Router } from 'react-router';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Sort from './Sort';
import Trees from './Trees';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/sort" component={Sort} />
    <Route path="/trees" component={Trees} />
    <Route path="/data-structures" />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
