import React from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import { 
  CreateUserForm,
  RemoveUserForm, 
  CreateBuildForm, 
  RemoveBuildForm,
  AddPartToBuildForm,
  RemovePartFromBuildForm,
  CreatePartForm,
  RemovePartForm,
  CreatePartRatingForm,
  CreateBuildRatingForm,
  RemoveRatingForm
} from './Forms.js';

function ViewTable(props) { 

  return (
    <div className='viewTableContainer'>
      <h3> Data for {`${props.type}`} goes here</h3>
    </div>
  )
}

function UsersForm(){

  return (
    <div className="formContainer">
      <h1>Add a User</h1>
      <CreateUserForm />
      <h1>Remove a User</h1>
      <RemoveUserForm />
    </div>
  );
}

function Users() {

  return (
    <div>
      <ViewTable type="Users"/>
      <UsersForm />      
    </div>
  );
}

function BuildsForm(){

  return (
    <div className="formContainer">
      <h1>Create a Build</h1>
      <CreateBuildForm />
      <h1>Remove a Build</h1>
      <RemoveBuildForm />
      <h1>Add parts to a Build</h1>
      <AddPartToBuildForm />
      <h1>Remove parts from a Build</h1>
      <RemovePartFromBuildForm />
    </div>
  );
}

function Builds() {

  return (
    <div>
      <ViewTable type="Builds"/>
      <BuildsForm />      
    </div>
  );
}

function PartsForm(){

  return (
    <div className="formContainer">
      <h1>Create a Part</h1>
      <CreatePartForm />
      <h1>Remove a Part</h1>
      <RemovePartForm />
      <h1>Add Parts to a Build</h1>
      <AddPartToBuildForm />
      <h1>Remove Parts from a Build</h1>
      <RemovePartFromBuildForm />
    </div>
  );
}

function Parts() {

  return (
    <div>
      <ViewTable type="Parts"/>
      <PartsForm />      
    </div>
  );
}

function RatingsForm(){

  return (
    <div className="formContainer">
      <h1>Rate a Part</h1>
      <CreatePartRatingForm />
      <h1>Rate a Build</h1>
      <CreateBuildRatingForm />
      <h1>Remove a Rating</h1>
      <RemoveRatingForm />
    </div>
  );
}

function Ratings() {

  return (
    <div>
      <ViewTable type="Ratings"/>
      <RatingsForm />      
    </div>
  );
}

function Navbar(){

  return (
    <div id="navbar">
      
        <Link className="logo" to="/">
          <h2 >The Sequels PC Building Site</h2>
        </Link>
      
      <div id="navlinkContainer">
        <NavLink className="navlink" to="/users">Users</NavLink>
        <NavLink className="navlink" to="/builds">Builds</NavLink>
        <NavLink className="navlink" to="/parts">Parts</NavLink>
        <NavLink className="navlink" to="/ratings">Ratings</NavLink>
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
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/builds">
            <Builds />
          </Route>
          <Route path="/parts">
            <Parts />
          </Route>
          <Route path="/ratings">
            <Ratings />
          </Route>
          <Route exact path="/">
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
