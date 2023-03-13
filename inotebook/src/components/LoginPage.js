import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
// const host = "http://localhost:4000";
const host = "https://inotebook-api-l0zv.onrender.com";

export default function LoginPage() {
    const [credentials,setcredentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleOnSubmit= async(e)=>{
           e.preventDefault();
           try{
            const response=await fetch(`${host}/api/auth/login`,{
                method:'POST',
                headers:{
                  'content-Type': 'application/json',
                },
                body:JSON.stringify({email:credentials.email,password:credentials.password})
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
        <div className='container d-flex justify-content-center '>
            <div className="formbox card p-4 mt-5" >
            <form onSubmit={handleOnSubmit}>
            <div className='fs-3 mb-3'>Login to access iNotebook</div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button> <br />
                <Link to="/signup" ><i>Do not have account ?</i>signup</Link>
            </form>
            </div>
        </div>
    )
}
