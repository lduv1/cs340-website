import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import './App.css';
import { 
  CreateBuildForm, 
  RemoveBuildForm,
  AddPartToBuildForm,
  RemovePartFromBuildForm
} from './Forms.js';
import {apiUrl} from './App';
import { View } from './View.js';

const buildsKeys = ['buildID', 'userID', 'parts'];
const buildsSearchKeys = ['buildID', 'userID'];

function BuildsForm(props){

  return (
    <div className="formContainer">
      <h1>Create a Build</h1>
      <CreateBuildForm {...props}/>
      <h1>Remove a Build</h1>
      <RemoveBuildForm {...props}/>
      <h1>Add Parts to a Build</h1>
      <AddPartToBuildForm {...props}/>
      <h1>Remove Parts from a Build</h1>
      <RemovePartFromBuildForm {...props}/>
    </div>
  );
}

export function Builds() {
  const [ inputQuery, setInputQuery ] = useState("");
  const [ tableData, setTableData ] = useState([{loading:"loading"}]);
  const [ refreshCount, setRefreshCount ] = useState(0);  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResults() {
      let responseBody = {};
      try {
        const response = await fetch(
          apiUrl + 'builds' + inputQuery,
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request aborted");
          responseBody.results = [{error:"error"}];

        } else {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
        }
      }
      console.log(responseBody);
      responseBody.results.map(row => {
        row.parts="";
        responseBody.buildsParts.map( buildpart => {
          if (row.buildID === buildpart.buildID){
            row.parts === "" ?
             row.parts += buildpart.partID :
            row.parts += (',' + buildpart.partID);
          }
          return 0;
        })
        return 0;
      });
      
      // console.log(responseBody)
      // console.log(responseBody.results)
      setTableData(responseBody.results);
    }

    fetchSearchResults();
    return () => {
      controller.abort();
    };
  }, [ refreshCount, inputQuery ]);
  return (
    <div>
      <View type="Builds" keys={buildsKeys} searchkeys={buildsSearchKeys} data={tableData} searchSubmit={setInputQuery}/>
      <BuildsForm updateCount={setRefreshCount} refreshCount={refreshCount}/>      
    </div>
  );
}