import React, { useEffect, useState } from 'react';
import { SellerOrderCard, Navbar } from '../../components';
import formatDate from '../../helper/formatDate';
import api from '../../helper/api';
import './SellerOrders.css';

export default function SellerOrders() {
  const [orderArray, setOrderArray] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      await api.get('/sales/')
        .then(({ data }) => setOrderArray(data))
        .catch((err) => {
          console.error(`ops! something is wrong: ${err}`);
        });
    };
    getOrders();
  }, []);

  // const n = 1000;
  const renderCard = (order) => (
    <SellerOrderCard
      key={ order.id }
      id={ order.id }
      orderId={ order.id }
      // orderId={ (Number(order.id) / n).toString().replace('.', '') }
      status={ order.status }
      date={ formatDate(order.saleDate) }
      value={ Number(order.totalPrice).toFixed(2).toString().replace('.', ',') }
      address={ `${order.deliveryAddress}, ${order.deliveryNumber}` }
    />);

  return (
    <div className="client-orders-container">
      <Navbar user="Thiago Prado" type="seller" />
      <section className="cardList-container">
        {orderArray.map(renderCard)}
      </section>
    </div>
  );
}
