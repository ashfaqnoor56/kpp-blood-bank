import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Singup() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [number,setNumber]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
   
    const navi=useNavigate()

    const handle=()=>{
        navi('/')   
    }

     const apidata=(e)=>{
        e.preventDefault();
        axios.post('https://67593f4e60576a194d140021.mockapi.io/donner',{name,email,number,password,cpassword})
        .then(()=>{
            setName('');
            setEmail('');
            setNumber('');
            setPassword('');
            setCpassword('');
        })
     }

  return (
    <>
    <Form onSubmit={apidata}>
   <div className='d-flex flex-column'>
    <div>Signup</div>
   <input type='text'   onChange={(e)=>setName(e.target.value)} placeholder='Name'/>
    <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email address'/>
    <input type='number'  onChange={(e)=>setNumber(e.target.value)}  placeholder='Number'/>
    <input type='password'  onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
    <input type='password'  onChange={(e)=>setCpassword(e.target.value)}  placeholder='Confim password'/>
    <button type='submit' className='btn bg-primary'>submit</button>
   </div>
    
    </Form>
    </>
  )
}

export default Singup