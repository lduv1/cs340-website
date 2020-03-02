import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import './App.css';
import { Filter } from './components/Filter.js';

export function View(props){

  return (
    <div className='viewTableContainer'>
      <div className='viewTableLabel'>
        <h3 className='viewTableTitle'>Data for {`${props.type}`}</h3>
        <Filter {...props}/>
      </div>
      <ViewTable {...props}/>
    </div>

  )
}

function ViewTable(props) { 
  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(props.keys).map(key => (
                <TableCell key={key}>{props.keys[key]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { props.data.map(row => (
            <TableRow key={row[Object.keys(row)[0]] || 'error'}>
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
