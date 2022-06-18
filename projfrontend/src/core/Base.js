import React from 'react';
import Menu from './Menu';


const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children
}) =>{
  return(
    <div>
    <Menu/>
          <div className="container-fluid  min-vh-100">
              <div className="jumbotron text-white text-center">
              {title !=='Home Page' ? ( <>
                <h2 className="display-4">{title}</h2> 
                <p className="head">{description}</p>
                </>
                ) : null}
              </div>
             <div className={className}>{children}</div>
          </div>
          <footer className="footer mt-auto">
            <div className="container-fluid bg-success text-white text-center py-3">
              <h4 className='d-inline mx-2'>If you got any questions, feel free to</h4>
              <button className="btn btn-warning btn-lg rounded">Contact Us</button>
              <div className="container text-center mt-2">
              <span className="text-muted">
              <span className="text-white"> © Copyright Sumana. </span> All rights reserved.
              </span>
             
            </div>
            </div>
        </footer>
    </div>
  )
}
export default Base;