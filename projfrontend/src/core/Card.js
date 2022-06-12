import React, { useState, useEffect } from "react";
import ImageHelper from './helper/ImageHelper';
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";


  const Card = ({product, addtoCart = true, removeFromCart = false, setReload = function(f){return f}, reload = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const cardTitle = product ? product.name: "A photo from pexel";

    const cardDescription = product ? product.description: "this photo looks great";
    const cardPrice = product ? product.price: "10";

    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true));
    };
  
    const getARedirect = redirect => {
      if (redirect) {
        return <Redirect to="/cart" />;
      }
    };

    const showAddToCart = (addtoCart) =>{
      
      return (

        addtoCart &&(
          <button
                onClick={addToCart}
                className="btn btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
        )
      )
    }
    const showRemoveFromCart = (removeFromCart) =>{
      return(
        removeFromCart &&(
          <button
          onClick={() => {
            removeItemFromCart(product._id)
            setReload(!reload)

          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
        )
      )
    }
    return (
      <div className="card text-white bg-dark border border-info">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
        {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="d-grid gap-2 col-12 mx-auto">
              {showAddToCart(addtoCart)}
            </div>
            
            <div className="d-grid gap-2 col-12 mx-auto">
             {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };
 
export default Card;