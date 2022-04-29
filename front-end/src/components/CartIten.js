import React from 'react';
import './CartIten.css';

const CartIten = () => {
  const itenNumber = 1;
  const description = 'Cerveja';
  const quantity = 2;
  const value = 5;
  const subTotal = 10;
  return (
    <div className="cartIten">
      <div>
        <h2 id="itenNumber">
          {itenNumber}
        </h2>
        <h2>
          {description}
        </h2>
      </div>
      <div className="cartItenValues">
        <h2>
          {quantity}
        </h2>
        <h2>
          {value}
        </h2>
        <h2>
          {subTotal}
        </h2>
      </div>
    </div>
  );
};

export default CartIten;
