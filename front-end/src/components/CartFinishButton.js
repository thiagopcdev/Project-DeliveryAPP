import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../context/Context';
import api from '../helper/api';

const CartFinishButton = ({ token }) => {
  const [isRedirect, setRedirect] = useState(false);
  const { cart, address, totalPrice, idOrder,
    addressNumber, sellerId, cleanCart } = useContext(Context);

  const finish = async () => {
    const orderDetails = cart.map(({ id, quantity }) => [id, quantity], []);
    const order = {
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      sellerId,
      orderDetails,
    };

    await api.post('/orders', order, { headers: { authorization: token } });
    cleanCart();
    setRedirect(true);
  };

  return (
    <>
      <button
        style={ {
          width: '30vw',
          height: '10vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: 'outset' } }
        onClick={ () => finish() }
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar
      </button>
      {
        isRedirect ? <Navigate to={ `/customer/orders/${idOrder}` } />
          : null
      }
    </>
  );
};

CartFinishButton.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default CartFinishButton;
