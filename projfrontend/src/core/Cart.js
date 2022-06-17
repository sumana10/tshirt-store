import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = () => {
		return (
			<div>
				{products.length > 0 ? (
					<h2>Looks Awesome🥰</h2>
				) : (
					<h2>
						Cart is Empty😞
						<Link className="btn btn-success" to={`/`}>
							<span className="">Continue Shopping</span>
						</Link>
					</h2>
				)}

				{products.map((product, index) => (
					// console.log(typeof index  === "number")

					<Card
						key={index}
						product={product}
						removeFromCart={true}
						addtoCart={false}
						setReload={setReload}
						reload={reload}
					/>

					// <Checkout key={index}
					// serial = {index + 1}
					// product={product}/>
				))}
			</div>
		);
	};
	const loadCheckout = () => {
		return (
			<div>
				<h2>This section for checkout</h2>
			</div>
		);
	};

	return (
		<Base title="Cart Page" description="Ready to checkout">
			<div className="row text-center flex-column-reverse flex-md-row">
				<div className="col-md-3 offset-md-2">{loadAllProducts()}</div>
				{/* <div className="col-md-6">{loadAllProducts()}</div>*/}
				<div className="col-md-6 mb-4">
					<StripeCheckout products={products} setReload={setReload} />
				</div>
			</div>
		</Base>
	);
};

export default Cart;
