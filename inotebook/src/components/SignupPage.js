import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
const host = "http://localhost:4000";

export default function SignupPage() {
  const [credentials,setcredentials]=useState({email:"" ,name:"", password:"",cpassword:""})
  let navigate=useNavigate();
  const handleOnSubmit= async(e)=>{
         e.preventDefault();
         try{
          const response=await fetch(`${host}/api/auth/createuser`,{
              method:'POST',
              headers:{
                'content-Type': 'application/json',
              },
              body:JSON.stringify({email:credentials.email, name:credentials.name,password:credentials.password})
            });
            const json =await response.json();
             console.log(json);
             if(json.success){
              // save the token and redirect
              localStorage.setItem('token',json.authToken)
              navigate("/");
             }
             else {
              alert("Invalid credentials")
             }
         }
         catch(err){
            console.log("Can not login try again!")
         }

  }

  const onchange =(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value});
  }


  return (
    <div className='container d-flex justify-content-center'>
      <div className="formbox card p-4 mt-5" >
      <form onSubmit={handleOnSubmit}>
        <div className='fs-3 mb-3'>Signup to use iNotebook</div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange}  required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange} required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button> <br />
        <Link to="/login" ><i>Already have account ? Login</i></Link>
      </form>
      </div>
    </div>
  )
}
