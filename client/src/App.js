import React from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import { Parts } from './Parts.js';
import { Ratings } from './Ratings.js';
import { Users } from './Users.js';
import { Builds } from './Builds.js';

export const apiUrl = 'http://flip1.engr.oregonstate.edu:55556/'

function Navbar(){

  return (
    <div id="navbar">
      
        <Link className="logo" to="/~duvoisil/cs340/">
          <h2 >The Sequels PC Building Site</h2>
        </Link>
      
      <div id="navlinkContainer">
        <NavLink className="navlink" to="/~duvoisil/cs340/users">Users</NavLink>
        <NavLink className="navlink" to="/~duvoisil/cs340/builds">Builds</NavLink>
        <NavLink className="navlink" to="/~duvoisil/cs340/parts">Parts</NavLink>
        <NavLink className="navlink" to="/~duvoisil/cs340/ratings">Ratings</NavLink>
      </div>
    </div>
  );
}

function App() {
  return (
    <div id="rootContainer">
      <Navbar />
      
      <div id="mainContent">
        <Switch>
          <Route path="/~duvoisil/cs340/users">
            <Users />
          </Route>
          <Route path="/~duvoisil/cs340/builds">
            <Builds />
          </Route>
          <Route path="/~duvoisil/cs340/parts">
            <Parts />
          </Route>
          <Route path="/~duvoisil/cs340/ratings">
            <Ratings />
          </Route>
          <Route exact path="/~duvoisil/cs340/">
            <h1>View information about the Sequels PC Building Company by clicking one of the navbar links above</h1>
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
