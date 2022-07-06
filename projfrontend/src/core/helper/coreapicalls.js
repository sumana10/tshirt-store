import { API } from "../../backend";

export const getProducts = () =>{
  return fetch(`${API}/products`, {method:"GET"})
  .then(response =>{
     return response.json();
     console.log(response);
  })
  .catch(err => console.log(err))
}