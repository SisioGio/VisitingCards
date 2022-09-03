
import React, { useEffect,useState } from "react";
import InputForm  from "./components/InputForm";
import Table from './components/Table'
import {Columns} from './components/Columns'
import Header from './components/Header'
import './CSS/General.css'



export default function App() {


    const[classForm,setClassForm] = useState("left-100")
    const[rowData,setRowData] = useState(null)
    const [tableClass,setTableClass] = useState(null)
    // Get table columns
    const[columns,setColumns] = useState(Columns)
    const[data,setData] = useState([{}]);
    // Update form class from left(-100) to left(0),
    // Triggers the custom transition animation.
    const updateClassForm = () => {
     
        if(classForm === "left-100"){
          setClassForm("left-0")
          setTableClass("position-relative")
        } else {
          setClassForm("left-100")
          setTableClass(null);
          
        }}

    // Get cards details from Flask API ( change server in package.json[proxy])
        const getCards = ()=>{
          fetch("/api/getcards").then(
            res => res.json()
          ).then(
            data => {
              setData(data);
      
            }
          )
        }
        useEffect(() =>{
          getCards();
      
        },[])

        useEffect(() =>{
          const fitlered_columns = () => columns.filter(column => {return column.show === true})
          setColumns(fitlered_columns)
        },[])


    // Set row data containing all the information about a clicked card
    const handleRowClick = (rowData) => {
      console.log(rowData)
      setRowData(rowData)
      if(rowData){
        setClassForm("left-0")
      }
      
    }

  return (

    
    <div id='App'>
        <Header  resetRowData={handleRowClick} classForm={classForm} updateClassForm={updateClassForm}/>
        
        


      <div className="container w-100">

        <div className=" container-child absolute w-100 scroll-x">
            <Table data={data}  onClick={handleRowClick} columns = {columns}/>
        </div>
      
        <div className={classForm +" container-child absolute custom-transition"} id='form-container'>
            <InputForm class={classForm} resetRowData={handleRowClick} updateClassForm={updateClassForm} getCards={getCards}  rowData={rowData}/>
        </div>

      </div>
        
    </div>
  
  
  );
}