import { useState } from 'react';

import './../CSS/Form.css'
import axios from "axios";
import { useEffect } from 'react';


function InputForm(props) {
    const[feedback,setFeedback] = useState(null);
    const [selectedFile, setSelectedFile] = useState([]);
    const[type,setType] = useState(null)
    const[language,setLanguage] = useState(null)
    const [ cardPhotos,setCardPhotos] = useState([{}])
  const[formData, setFormData] = useState({
    name: "",
    shopName:"",
    email:"",
    country:"",
    street:"",
    street_no:"",
    post_code:"",
    city :""

  })

  // Reset form data and set everything to empty string
  const resetFormData = () =>{
    setFormData({
      name: "",
    shopName:"",
    email:"",
    country:"",
    street:"",
    street_no:"",
    post_code:"",
    city :""
    })
  }

  // Update data inputed via select field
  const handleTypeSelection = (e)=> {
    setType(e.target.value)
  }
  const handleLanguageSelection = (e)=> {
    setLanguage(e.target.value)
  }

  // Update formData on input change
  function handleChange(event) { 
    const {value, name} = event.target
    
    setFormData(prevNote => ({
        ...prevNote, [name]: value})
    )}
  // Update file on new  input
    const handleFileInput = (e) => {
        // handle validations
        e.preventDefault();
        const file = e.target.files;
        setSelectedFile(file);
      
        
      };
    
      // Send POST request form to API and create a new Card object
    const submitForm = (event) => {
        event.preventDefault();
        const form = new FormData();
        
        form.append("name", formData.name);
        form.append("shop_name", formData.shop_name);
        form.append("mail", formData.email);
        form.append("language", language);
        form.append("type", type);
        form.append("country", formData.country);
        form.append("city", formData.city);
        form.append("street", formData.street);
        form.append("street_no", formData.street_no);
        form.append("post_code", formData.post_code);
        for (let i = 0; i < selectedFile.length; i++) {
            form.append("pics", selectedFile[i]);
          }
        for (const value of form.values()) {
            console.log(value);
          }
          axios
          .post("/addcard/", form,
          {headers: {
            'Content-Type':'application/json'
          }}
          )
          .then((res) => {
            console.log(res)
            props.getCards();
            props.updateClassForm();
            props.resetDataRow();
            
          })
          .catch((err) => {
            setFeedback(err.response.data)
            console.log(err.response.data)
          })
        
        }
        // Get photos of clicked cards if any
const get_photos=  () =>{

  if(props.rowData){
    fetch("/api/get_card_photos?card_id="+ props.rowData.id ,
    ).then(
       res => res.json()
     ).then(
       data => {
         setCardPhotos(data);
         console.log(data)
       }
     )
  }
    
  }
  
  // Delete card via API
  const deleteCard = () =>{

    axios
    .post("/deletecard?card_id="+props.rowData.id,
    {headers:
      {
      'Content-Type':'application/json'
    }}
    )
    .then((res) => {
      console.log(res)
      props.rowData=null;

      
    })
    .catch((err) => alert("Error while deleting item"));
    
    window.location.reload(false)  
  }

        useEffect(() =>{
          console.log("Getting data...")
          if(props.rowData){
            
            setFormData(
              {name:props.rowData.name,
              shopName:props.rowData.shop_name,
              email:props.rowData.mail,
              country:props.rowData.country,
              street:props.rowData.street,
              street_no:props.rowData.street_no,
              post_code:props.rowData.post_code,
              city: props.rowData.city
          })
          } else {
            setCardPhotos([{}])
            setFormData(
              {name:"",
              shopName:"",
              email:"",
              country:"",
              street:"",
              street_no:"",
              post_code:"",
              city: ""
          })
          }
          get_photos();
        },[props])
      
    

  return (
    <div>
      <div className='spacerSmall'></div> 
    
    {props.rowData?(
                    <h1>See the details below</h1>
    ):(
                    <div>
                            <h1>Welcome!<br/></h1>
                            <h2><br/>Add a new visiting card by filling the below form</h2>
                    </div>     
    )}

<div id='form-wrapper'>


    {(typeof cardPhotos.photos == 'undefined') ? (
                          null
                          ):(
                          <div className="form-images">
                                {cardPhotos.photos.map(photo =>(
                                  <img src={"/api/getphoto/"+photo.id} alt="" />
                                ))}
                          </div>
                    )}
  
   <form   onSubmit={submitForm}  action="">

           
<div className="column-l">
    <input onChange={handleChange} placeholder="Nome e cognome" type="text" text={formData.name} id="name" name="name" value={formData.name} />
</div>

<div className="column-l">
    <input onChange={handleChange} placeholder="Rag. Sociale" type="text" id="shop_name" name="shop_name" value={formData.shop_name} />
</div>





<div className="form-row column-s ">


{props.rowData ? (
<select required  onChange={handleLanguageSelection} name="language" id="language">

<option value="">{props.rowData.language}</option>

</select>
):(
<select required  onChange={handleLanguageSelection} name="language" id="language">
<option disabled selected value="">--Please choose an option--</option>
<option value="EN">EN</option>
<option  value="IT">IT</option>
</select>

)}

</div>

<div className="form-row column-s ">

{props.rowData ? (
<select required onChange={handleTypeSelection} name="type" id="type">
<option selected disabled  value="">{props.rowData.type}</option>
</select>
):(
<select required onChange={handleTypeSelection} name="type" id="type">
<option selected disabled  value="">--Please choose an option--</option>
<option  value="Negozio">Negozio</option>
<option value="Distributore">Distributore</option>
<option value="Giornalisti">Giornalisti</option>
<option value="Cliente">Cliente</option>
<option value="Online shop">Online shop</option>
<option value="Distributore">Distributore</option>
</select>
)}




</div>





<div className="form-row column-l">
<input onChange={handleChange} placeholder="Indirizzo e-mail" type="email" id="email" name="email" value={formData.email} />
</div>



<div className="form-row column-s">
<input onChange={handleChange} placeholder="Paese" type="text" id="country" name="country" value={formData.country} />
</div>
<div className="form-row column-s">
<input onChange={handleChange} placeholder="Citta" type="text" id="city" name="city" value={formData.city} />
</div>



<div className="form-row column-s">
<input onChange={handleChange} placeholder="Via" type="text" id="street" name="street" value={formData.street} />
</div>







<div className="form-row column-s">
<input onChange={handleChange} placeholder="Codice postale" type="text" id="post_code" name="post_code" value={formData.post_code} />
</div>
{props.rowData? ( null):(
<div className="form-row column-l file-upload-cont">
<label htmlFor="multiple-file-input" class='custom-file-input'>Upload Photos</label>
<input id="multiple-file-input" multiple  name="pics"   accept="image/*" type="file" onChange={handleFileInput}/>
</div>

)}

{props.rowData? (

<button type="button" onClick={deleteCard}className='column-l delete-btn'>Delete</button>



):(<button type="submit" className='column-l'>Submit</button>)}


</form>

</div>


        {feedback?(
            <small>{feedback}</small>
        ):null}
   </div>
  
        
       



    
  );
}

export default InputForm;
