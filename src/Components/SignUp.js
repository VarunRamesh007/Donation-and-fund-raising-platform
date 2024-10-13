import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles.css'

function SignUp() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      const handleChange =(e)=>
      {
        const{name,value} = e.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
      };
      const handleSubmit = async ()=>
      {
        const response = await axios.post('http://127.0.0.1:8080/adddonor', formData)
        console.log(response.data)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          navigate(`/donations/${response.data.transaction_id}`);

      };
      const handleLogin = () =>
      {
        navigate('/login');
      }
  return (
    <div id='signin'>
       <div className='overlay'>
        <center>
        <h1 class="typewriter"> SIGN UP</h1>
        <div id='sdetails'>
        <label>First Name </label>
        <input name='firstName' onChange={handleChange} type='text'></input>
        <br></br>
        <br></br>
        <label>Last Name </label>
        <input name='lastName'  onChange={handleChange} type='text'></input>
        <br></br>  <br></br>
        <label>Email </label>
        <input  name='email' onChange={handleChange} type='text'></input>
        <br></br>  <br></br>
        <label>Password </label>
        <input  name='password' onChange={handleChange} type='text'></input>
        <br></br> 
        <button id='signbutton' onClick={handleSubmit}>Sign Up</button>
        <br></br>
        <label>Already a user?</label>
        <button id='loginbutton' onClick={handleLogin}>Login</button>
        <br></br>
        </div>
        </center>
<br></br>
<br></br>
<br></br>
    </div>
    </div>
  )
}

export default SignUp