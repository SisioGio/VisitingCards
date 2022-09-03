
import './../CSS/Header.css'

function Header(props) {
    
    const updateClassForm =()=>{
       console.log("Removing")
      props.updateClassForm();
      props.resetRowData(null)
    }

  return (
    <div id='header'>
      <h1>Logo</h1>
      <button onClick={() =>  updateClassForm()}>  {props.classForm=="left-100"?"New":"Close"}</button>

   </div>
  
        
       



    
  );
}

export default Header;
