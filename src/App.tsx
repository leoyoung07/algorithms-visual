import React from 'react';
import { Link } from 'react-router';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <ul>
          <li><Link to="/sort">Sort</Link></li>
          <li><Link to="/trees">Trees</Link></li>
        </ul>
      </div>
    );
  }
}

export default App;
