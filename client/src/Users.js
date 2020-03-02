import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import './App.css';
import { 
  CreateUserForm,
  RemoveUserForm
} from './Forms.js';
import { View } from './View.js';
import {apiUrl} from './App';

const usersKeys = ['userID', 'email', 'password', 'first_name', 'last_name']

function UsersForm(props){

  return (
    <div className="formContainer">
      <h1>Add a User</h1>
      <CreateUserForm {...props}/>
      <h1>Remove a User</h1>
      <RemoveUserForm {...props}/>
    </div>
  );
}

export function Users() {

  const [ inputQuery, setInputQuery ] = useState("");
  const [ tableData, setTableData ] = useState([{loading:"loading"}]);
  const [ refreshCount, setRefreshCount ] = useState(0);  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResults() {
      let responseBody = {};
      try {
        const response = await fetch(
          apiUrl + 'users'+ inputQuery,
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
      <View type="Users" keys={usersKeys} data={tableData} searchSubmit={setInputQuery}/>
      <UsersForm updateCount={setRefreshCount} refreshCount={refreshCount}/>      
    </div>
  );
}
