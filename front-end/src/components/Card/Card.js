import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import currencyFormatter from '../../helper/currencyFormatter';
import './Card.css';

export default function Card({ info, image }) {
  const { id, name, price } = info;
  const [quantity, setQuantity] = useState(0);
  const { cart, updateQuantity } = useContext(Context);

  const handleChange = ({ target }) => {
    if (typeof Number(target.value) !== 'number') return;
    setQuantity(Number(target.value));
    updateQuantity({ id, name, price, quantity: Number(target.value) });
  };

  const subQuantity = () => {
    updateQuantity({ id, name, price, quantity: quantity - 1 });
  };

  const addQuantity = () => {
    updateQuantity({ id, name, price, quantity: quantity + 1 });
  };

  useEffect(() => {
    const cartItem = cart.find((product) => id === product.id);

    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, id]);

  return (
    <div className="card-body">
      <div
        className="price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { currencyFormatter(price) }
      </div>
      <img
        alt={ name }
        src={ image }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <div className="div-buttons">
        <p
          className="drink-name"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <div className="container-buttons">
          <button
            className="btn-add"
            type="button"
            onClick={ subQuantity }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            className="input-quantity"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            onChange={ handleChange }
            type="number"
          />
          <button
            className="btn-sub"
            type="button"
            onClick={ addQuantity }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url_image: PropTypes.string,
  }),
}.isRequired;
