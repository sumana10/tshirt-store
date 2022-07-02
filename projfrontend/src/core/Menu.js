import {React, Fragment} from 'react';
import{Link, withRouter} from "react-router-dom";

import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) =>{
  if(history.location.pathname === path){
    return {color: "#2ecc72"}
  }else{
    return {color: "#fff"}
  }
}
const Menu = ({history}) =>(
  <div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link style={currentTab(history,'/')} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link style={currentTab(history,'/cart')} className="nav-link" to="/cart">
          Cart
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
        <Link style={currentTab(history,'/user/dashborad')} className="nav-link" to="/user/dashboard">
          Profile
        </Link>
      </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 &&(
        <li className="nav-item">
        <Link style={currentTab(history,'/admin/dashboard')} className="nav-link" to="/admin/dashboard">
          Admin
        </Link>
      </li>
      )}
      {!isAuthenticated() &&(
      <Fragment>
      <li className="nav-item">
        <Link style={currentTab(history,'/signup')} className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link style={currentTab(history,'/signin')} className="nav-link" to="/signin">
          Signin
        </Link>
      </li>
      </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item" style={{cursor:"pointer"}}>
        <span className="nav-link text-warning" onClick={() =>
        signout(() =>{
          history.push("/")
        })}>
          Signout
        </span>
      </li>
      )}
    </ul>
  </div>

)

export default withRouter(Menu);
//it's gonna pick all the routes using the link from the file route.js 