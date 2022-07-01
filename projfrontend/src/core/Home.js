import React, {useEffect, useState} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
    <div className="row text-center">
    <h1 className="text-white mb-5">All of tshirts</h1>
    <div className="row mx-auto" style={{maxWidth:"1100px"}}>
    {products.map((tee, index) => {
      return (
        <div key={index} className="col-md-4 col-sm-6 mb-4">
          <Card product={tee}/>
        </div>
      );
    })}
    </div>
    </div>
    </Base>
  );
}