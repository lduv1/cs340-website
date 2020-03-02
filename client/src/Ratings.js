import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import './App.css';
import { 
  CreatePartRatingForm,
  CreateBuildRatingForm,
  UpdateBuildRatingForm,
  RemoveRatingForm
} from './Forms.js';
import {apiUrl} from './App';
import { View } from './View.js';

const ratingsKeys = ['ratingID', 'userID', 'ratedID', 'buildOrPart', 'ratingValue', 'comment'];

function RatingsForm(props){

  return (
    <div className="formContainer">
      <h1>Rate a Part</h1>
      <CreatePartRatingForm {...props}/>
      <h1>Rate a Build</h1>
      <CreateBuildRatingForm {...props}/>
      <h1>Update a rating</h1>
      <UpdateBuildRatingForm {...props}/>
      <h1>Remove a Rating</h1>
      <RemoveRatingForm {...props}/>
    </div>
  );
}

export function Ratings() {
  const [ inputQuery, setInputQuery ] = useState("");
  const [ tableData, setTableData ] = useState([{loading:"loading"}]);
  const [ refreshCount, setRefreshCount ] = useState(0);  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResults() {
      let responseBody = {};
      try {
        const response = await fetch(
          apiUrl + 'ratings' + inputQuery,
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
      <View type="Ratings" keys={ratingsKeys} data={tableData} searchSubmit={setInputQuery}/>
      <RatingsForm updateCount={setRefreshCount} refreshCount={refreshCount}/>      
    </div>
  );
}
