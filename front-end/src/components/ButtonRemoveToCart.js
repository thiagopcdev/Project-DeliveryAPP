import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

const ButtonRemoveToCart = ({ index, idProduct }) => {
  const { cart, setCart } = useContext(Context);

  const removeToCart = (id) => {
    const filterCart = cart.filter((product) => id !== product.id);
    setCart(filterCart);
  };

  return (
    <button
      type="button"
      data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      onClick={ () => removeToCart(idProduct) }
    >
      Remover
    </button>
  );
};

ButtonRemoveToCart.propTypes = {
  index: PropTypes.string,
  idProduct: PropTypes.number,
}.isRequired;

export default ButtonRemoveToCart;
