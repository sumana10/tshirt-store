export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //JSON.parse() function is used to convert a string into a JavaScript object 
    cart.push({
      ...item,
      count: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    //JSON.stringify() function is used to convert a JavaScript object into a string
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) =>{

  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) =>{

      if(product._id === productId){
        cart.splice(i, 1)
      }
      //Removes 1 item at index i
    })
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;

}

export const cartEmpty = next =>{

  if(typeof window !== undefined){
    localStorage.removeItem("cart")
    next()
  }
}