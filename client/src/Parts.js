import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import './App.css';
import { 
  AddPartToBuildForm,
  RemovePartFromBuildForm,
  CreatePartForm,
  RemovePartForm
} from './Forms.js';
import {apiUrl} from './App';
import { View } from './View.js';

const partsKeys = ['partID', 'partType', 'price', 'specs'];

function PartsForm(props){

  return (
    <div className="formContainer">
      <h1>Create a Part</h1>
      <CreatePartForm {...props}/>
      <h1>Remove a Part</h1>
      <RemovePartForm {...props}/>
      <h1>Add Parts to a Build</h1>
      <AddPartToBuildForm {...props}/>
      <h1>Remove Parts from a Build</h1>
      <RemovePartFromBuildForm {...props}/>
    </div>
  );
}

export function Parts() {
  const [ inputQuery, setInputQuery ] = useState("");
  const [ tableData, setTableData ] = useState([{loading:"loading"}]);
  const [ refreshCount, setRefreshCount ] = useState(0);  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResults() {
      let responseBody = {};
      try {
        const response = await fetch(
          apiUrl + 'parts' + inputQuery,
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request aborted");
          responseBody.results = [{error:"error"}];

        } else {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error", type: e.message}];

        }
      }
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
      <View type="Parts" keys={partsKeys} searchkeys={partsKeys} data={tableData} searchSubmit={setInputQuery}/>
      <PartsForm updateCount={setRefreshCount} refreshCount={refreshCount}/>      
    </div>
  );
}
