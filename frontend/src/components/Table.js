
import React, {  useState,useMemo,useEffect } from "react";
import {useTable, useFilters} from 'react-table'
import './../CSS/Table.css'

export default function Table(props) {
// Send rowIndex value to parent component,
//    When a row is clicked, the correspondend card_id is sent to App.js
//  and then to InputForm.js where the data are displayed.

    const handleClickRow=(rowIndex)=>{
        props.onClick(rowIndex);
        
    }

// Create table instance from react-table
// Data and columns are retrieved in App.js
// Data: From API 
// Columns: From ./Columns.js --> Check column settings
const tableInstance = useTable({
    columns: props.columns,
    data:props.data,
},
useFilters)   

const{
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
} = tableInstance


  return (

<div>
<table {...getTableProps()}>
    <thead>
        {headerGroups.map((headerGroup) =>(
            <tr  {...headerGroup.getHeaderGroupProps()}>
                
                {
                    headerGroup.headers.map(column =>(
                        <th {...column.getHeaderProps()}>{column.render("Header")}
                        <div>{column.canFilter? column.render("Filter"):null}</div>
                        </th>
                    ))
                }
              
        </tr>

         ))}
        
    </thead>

    <tbody {...getTableBodyProps()}>
        {
            rows.map(row=>{
                prepareRow(row)
                return (
               
                <tr  onClick={() => handleClickRow(row.original)}  {...row.getRowProps()}>
                    {
                            
                        
                        row.cells.map(cell =>{
                            return(<td {...cell.getCellProps()}>{cell.render("Cell")}</td>)
                        })
                    }
                    
                </tr>
                )
            })
        }
            
    </tbody>
  </table>
</div>


   
  
  
  );
}