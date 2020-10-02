import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Board from './components/Board/Board';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Board} />
        <Route path="/checklist/:id" component={Board} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

