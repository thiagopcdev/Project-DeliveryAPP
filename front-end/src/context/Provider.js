import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import api from '../helper/api';

export default function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [infoAddress, setInfoAddress] = useState({});
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellerId, setSeller] = useState(2);
  const [idOrder, setIdOrder] = useState('');
  const [status, setStatus] = useState('Pendente');

  const updateQuantity = ({ name, price, id, quantity }) => {
    if (quantity < 0) quantity = 0;
    const filterCart = cart.filter((product) => id !== product.id);
    const subTotal = quantity * price;
    setCart([...filterCart, { name, price, id, quantity, subTotal }]);
  };

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem('cart'));

    if (storageCart) {
      setCart(storageCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = cart.reduce((acc, curr) => {
      acc += curr.price * curr.quantity;
      return acc;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const cleanCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const updateStatus = async (stats, id) => {
    await api.put(`/sales/${id}`, { status: stats });
    setStatus(stats);
  };

  const context = {
    cart,
    updateQuantity,
    totalPrice,
    setCart,
    infoAddress,
    setInfoAddress,
    setAddress,
    setAddressNumber,
    address,
    addressNumber,
    setSeller,
    sellerId,
    idOrder,
    setIdOrder,
    cleanCart,
    status,
    updateStatus,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
