import React from 'react'
import ImageHelper from './helper/ImageHelper';

const Checkout = ({serial, product}) => {

  return (
  <table class="table">
  <tbody>
    <tr>
      <th scope="row">{serial}</th>
      <td><ImageHelper product={product}/></td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
    </tr>
  </tbody>
</table>
  )
}

export default Checkout