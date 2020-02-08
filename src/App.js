import React from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import './App.css';
import peopleData from './data/people.json';
import filmsData from './data/films.json';
import planetsData from './data/planets.json';

function DataViewer(props) {
  return (
    <div>
      {Object.keys(props.data[props.dataId]).map( key => (
        <div className="entry" key={`entry-${key}`}>
          <div className="entry-label"> {key} </div>
          { Array.isArray(props.data[props.dataId][key]) ? (
            <ul>
              {props.data[props.dataId][key].map(element =>  (
                <li className="entry-list-item" key={`li-${element.split('/')[2]}`}>
                  <Link to={`${element}`} >{element}</Link>
                </li>
              ))}
            </ul>
          ) : ( typeof props.data[props.dataId][key] == "string" && 
                props.data[props.dataId][key].split('/').length === 4 ? (
                  <Link 
                    className="entry-url" 
                    to={`${props.data[props.dataId][key]}`} >
                      {props.data[props.dataId][key]}
                  </Link>
            ) : (
              <div className="entry-value">{props.data[props.dataId][key]}</div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

function Planets() {
  var { planetId } = useParams();
  if(!planetId){ planetId = 1;}
  console.log(planetId);
  return (
    <div>
      <h1>Planets - {planetsData[planetId].name}</h1>
      <DataViewer dataId={planetId} data={planetsData}/>
    </div>
  );
}

function Films() {
  var { filmId } = useParams();
  if(!filmId){ filmId = 1;}
  console.log(filmId);
  return (
    <div>
      <h1>Films - {filmsData[filmId].title}</h1>
      <DataViewer dataId={filmId} data={filmsData}/>
    </div>
  );
}

function People() {
  var { personId } = useParams();
  if(!personId){ personId = 1;}
  console.log(personId);
  return (
    <div>
      <h1>People - {peopleData[personId].name}</h1>
      <DataViewer dataId={personId} data={peopleData}/>
    </div>
  );
}

function Navbar(){

  return (
    <div id="navbar">
      
        <Link className="logo" to="/">
          <h2 >A long time ago, in a galaxy far, far away...!!</h2>
        </Link>
      
      <div id="navlinkContainer">
        <NavLink className="navlink" to="/people">People</NavLink>
        <NavLink className="navlink" to="/planets">Planets</NavLink>
        <NavLink className="navlink" to="/films">Films</NavLink>
      </div>
    </div>
  );
}

function SidebarList(props){
  const { url } = useRouteMatch();
  const nameKey = Object.keys(props.data['1'])[0];
  return (
    <div className="sidebarItemContainer">
        {Object.keys(props.data).map( key => (
            <NavLink 
              className="sidebarItem" 
              key={`${key}`} 
              to={`${url}/${key}`}>
                {props.data[`${key}`][nameKey]}
            </NavLink>
        ))}
    </div>

    
  );
}

function Sidebar(){
  return (
    <div id="sidebar">
      <Switch>
        <Route path="/people">
          <SidebarList data={peopleData}/>
        </Route>
        <Route path="/planets">
          <SidebarList k={Object.keys(planetsData['1'])[1]} data={planetsData}/>
        </Route>
        <Route path="/films">
          <SidebarList k={Object.keys(filmsData['1'])[1]} data={filmsData}/>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <div id="rootContainer">
      <Navbar />
      
      <Switch>
        <Route path="/people">
          <Sidebar />
        </Route>
        <Route path="/planets">
          <Sidebar />
        </Route>
        <Route path="/films">
          <Sidebar />
        </Route>
      </Switch>
      <div id="mainContent">
        <Switch>
          <Route path="/people/:personId">
            <People />
          </Route>
          <Route path="/planets/:planetId">
            <Planets />
          </Route>
          <Route path="/films/:filmId">
            <Films />
          </Route>
          <Route path="/people">
            <h1>Please select a person from the sidebar</h1>
          </Route>
          <Route path="/planets">
            <h1>Please select a planet from the sidebar</h1>
          </Route>
          <Route path="/films">
            <h1>Please select a film from the sidebar</h1>
          </Route>
          <Route exact path="/">
            <h1>View information about Star Wars Films, Planets, and People by clicking one of the navbar links above</h1>
          </Route>
          <Route path="*">
            <h1>404 - Impossible, perhaps the archives are incomplete.</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
