import React, { useEffect, useState } from 'react';
import { ClientOrderCard, Navbar } from '../../components';
import formatDate from '../../helper/formatDate';
import api from '../../helper/api';
import './CustomerOrders.css';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
let token = '';
if (userFromLocalStorage) {
  token = userFromLocalStorage.token;
}

export default function Orders() {
  const [orderArray, setOrderArray] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      await api.get('/sales/customer', { headers: { Authorization: token } })
        .then(({ data }) => setOrderArray(data))
        .catch((err) => {
          console.error(`ops! something is wrong: ${err}`);
        });
    };
    getOrders();
  }, []);

  // const n = 1000;
  const renderCard = (order) => (
    <ClientOrderCard
      key={ order.id }
      id={ order.id }
      // orderId={ (Number(order.id) / n).toString().replace('.', '') }
      orderId={ order.id }
      status={ order.status }
      date={ formatDate(order.saleDate) }
      value={ Number(order.totalPrice).toFixed(2).toString().replace('.', ',') }
    />);
  return (
    <div className="client-orders-container">
      <Navbar />
      <section className="cardList-container">
        {orderArray.map(renderCard)}
      </section>
    </div>
  );
}
