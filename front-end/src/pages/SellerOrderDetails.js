import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, SallerTableItems } from '../components';
import formatDate from '../helper/formatDate';
import api from '../helper/api';
import Context from '../context/Context';

const SellerOrderDetails = () => {
  const { status, updateStatus } = useContext(Context);
  // const [nameSeller, setNameSeller] = useState('');
  const [orderData, setOrderData] = useState(null);
  const { id: idOrder } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      // const { data: dataSeller } = await api.get('/users?role=seller');
      const { data: dataOrder } = await api.get('/orders');
      const order = dataOrder.filter(({ id }) => id === Number(idOrder));
      setOrderData(order[0]);
      // setStatus(order[0].status);
      updateStatus(order[0].status, idOrder);

      // const seller = dataSeller.filter(({ id }) => id === order[0].sellerId);
      // setNameSeller(seller[0].name);
    };
    getInfo();
  }, [idOrder, updateStatus]);
  const testIdPart1 = 'seller_order_details__';

  const btnPrepararDisabled = (statusNow) => {
    if (statusNow === 'Pendente') return false;
    return true;
  };

  const btnSaiuDisabled = (statusNow) => {
    if (statusNow === 'Preparando') return false;
    return true;
  };

  if (!orderData) return <h2>carregando...</h2>;

  return (
    <>
      <Navbar />
      <div style={ { borderStyle: 'outset', alignItems: 'center' } }>
        <p data-testid="seller_order_details__element-order-details-label-order-id">
          PEDIDO:
          {idOrder}
        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          {formatDate(orderData.saleDate)}
        </p>
        <p
          data-testid={ `${testIdPart1}element-order-details-label-delivery-status` }
        >
          {status}
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ btnPrepararDisabled(status) }
          onClick={ () => updateStatus('Preparando', idOrder) }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ btnSaiuDisabled(status) }
          onClick={ () => updateStatus('Em Trânsito', idOrder) }
        >
          SAIU PARA A ENTREGA
        </button>
        {orderData && <SallerTableItems array={ orderData.products } />}
        <span>
          <h2 data-testid="seller_order_details__element-order-total-price">
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
export default SellerOrderDetails;
