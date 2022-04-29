import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components';
import TableItems from '../components/OrderDetails/TableItems';
import formatDate from '../helper/formatDate';
import api from '../helper/api';
import Context from '../context/Context';

const MyOrderDetails = () => {
  // const { cart, setCart, totalPrice, sellerId } = useContext(Context);
  const { status, updateStatus } = useContext(Context);
  const [nameSeller, setNameSeller] = useState('');
  const [orderData, setOrderData] = useState(null);
  const { id: idOrder } = useParams();

  const getInfo = useCallback(async () => {
    const { data: dataSeller } = await api.get('/users?role=seller');
    const { data: dataOrder } = await api.get('/orders');
    const order = dataOrder.filter(({ id }) => id === Number(idOrder));
    setOrderData(order[0]);

    const seller = dataSeller.filter(({ id }) => id === order[0].sellerId);
    updateStatus(order[0].status, idOrder);
    setNameSeller(seller[0].name);
  }, [idOrder, updateStatus]);

  useEffect(() => {
    getInfo();
  }, [getInfo, idOrder, updateStatus]);

  useEffect(() => {
    getInfo();
  }, [getInfo, status]);

  const testIdPart1 = 'customer_order_details__';

  const statusOk = (statusNow) => {
    if (statusNow === 'Em Trânsito') return false;
    return true;
  };

  if (!orderData) return <h2>carregando...</h2>;

  return (
    <>
      <Navbar />
      <div style={ { borderStyle: 'outset', alignItems: 'center' } }>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          PEDIDO:
          {idOrder}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          P. Vend:
          {nameSeller}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          {formatDate(orderData.saleDate)}
        </p>
        <p
          data-testid={ `${testIdPart1}element-order-details-label-delivery-status` }
        >
          {status}
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ statusOk(status) }
          onClick={ () => updateStatus('Entregue', idOrder) }
        >
          MARCAR COMO ENTREGUE
        </button>
        {orderData && <TableItems array={ orderData.products } />}
        <span>
          <h2 data-testid="customer_order_details__element-order-total-price">
            Total:
            {' '}
            R$
            {Number(orderData.totalPrice).toFixed(2).toString().replace('.', ',')}
          </h2>
        </span>
      </div>
    </>
  );
};
export default MyOrderDetails;
