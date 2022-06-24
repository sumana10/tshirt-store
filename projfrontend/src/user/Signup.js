import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false

  });

  const {name, email, password, error, success} = values;

  const handleChange = name => event => {

    setValues({...values, error: false, [name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({ name, email, password })
    .then(data =>{
      if(data.error){
        setValues({ ...values, error: data.error, success: false })
      }else{
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    })
    .catch(console.log("Error in signup"))
  }
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-2">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" value={name}
              onChange = {handleChange("name")} placeholder="Enter your name"/>
            </div>
            <div className="form-group mb-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" value={email}
              onChange = {handleChange("email")} placeholder="Enter your email" />
            </div>
            <div className="form-group mb-2">
             
              <label className="text-light">Password</label>
              <div>
              
              <input className="form-control" type="password"  value={password}
              onChange = {handleChange("password")} placeholder="Create your password"/>
              </div>
              
            </div>
            <div class="d-grid gap-2 py-2 mt-4">
              <button onClick={onSubmit} className="btn btn-success rounded" type="button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
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
  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">
      {/* {JSON.stringify(values)} */}
      </p>
    </Base>
  );
};

export default Signup;
