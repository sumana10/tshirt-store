import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import {signin, authenticate, isAuthenticated} from '../auth/helper';

const Signin = () => {

  const [values, setValues] = useState({
    email: "sumana@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false

  });
  const {email, password, error, loading, didRedirect} = values;

  const {user} = isAuthenticated();

  const handleChange = name => event => {

    setValues({...values, error: false, [name]: event.target.value})
  }
  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading:true});
    signin({ email, password })
    .then(data =>{
      if(data.error){
        setValues({ ...values, error: data.error, loading: false })
      }else{
        authenticate(data, ()=>{
        setValues({
          ...values,
          didRedirect: true
        });
      })
      }
    })
    .catch(console.log("signin request failed"))
  }
  const performRedirect = () =>{
    //TODO: do a redirection here
    if(didRedirect){
      if(user && user.role === 1){
        return <Redirect to="/"/>
      }else{
        return <Redirect to="/"/>
      }
    }
    if(isAuthenticated()){
      return <Redirect to="/"/>
    }
  }
  const loadingMessage = () =>{
    return( 
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
     );
   
   }
   const successMessage = () =>{
    return( 
      <div className="row">
       <div className="col-md-6 offset-sm-3 text-left">
         <div className="alert alert-success"
           style={{display: success ? "" : "none"}}>
               New account was created successfully. Please <Link to="/signin">Login here</Link>
         </div>
       </div>
     </div>
     );
   
   }
   const errorMessage = () =>{
     return(
     <div className="row">
       <div className="col-md-6 offset-sm-3 text-left">
         <div className="alert alert-danger"
               style={{display: error ? "" : "none"}}>
               {error}
         </div>
       </div>
     </div>
     );
   
   }
   
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" value={email}
              onChange = {handleChange("email")} placeholder="Enter your email"/>
            </div>

            <div className="form-group mb-2">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" value={password}
              onChange = {handleChange("password")} placeholder="Enter your password"/>
            </div>
            <div class="d-grid gap-2 py-2 mt-4">
              <button onClick={onSubmit} className="btn btn-success rounded" type="button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
     {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
