import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
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
  UpdateBuildRatingForm,
  RemoveRatingForm
} from './Forms.js';
import { ratingsData, partsData, buildsData, usersData} from './dummydata.js';
import { Filter } from './Filter.js';

function View(props){

  return (
    <div className='viewTableContainer'>
      <div className='viewTableLabel'>
        <h3 className='viewTableTitle'>Data for {`${props.type}`}</h3>
        <Filter data={props.data}/>
      </div>
      <ViewTable data={props.data}/>
    </div>

  )
}

function ViewTable(props) { 

  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(props.data[0]).map(key => (
                <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { props.data.map(row => (
            <TableRow key={row['ID']}>
              { Object.keys(row).map( rowkey => (
                <TableCell key={row['ID'] + ' ' + rowkey}> {row[rowkey]} </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
      <View type="Users" data={usersData}/>
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
      <View type="Builds" data={buildsData}/>
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
      <View type="Parts" data={partsData}/>
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
      <h1>Update a rating</h1>
      <UpdateBuildRatingForm />
      <h1>Remove a Rating</h1>
      <RemoveRatingForm />
    </div>
  );
}

function Ratings() {

  return (
    <div>
      <View type="Ratings" data={ratingsData}/>
      <RatingsForm />      
    </div>
  );
}

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
