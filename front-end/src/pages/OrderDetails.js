import React, { useState } from 'react';
import CartIten from '../components/CartIten';
import './OrderDetails.css';

const OrderDetails = () => {
  const orderNumber = '0003';
  const orderSeller = 'Julia';
  const orderDate = '07/04/2021';
  const [orderStatus, setOrderStatus] = useState('PENDENTE');
  const totalValue = 28.99;

  return (
    <>
      <div>
        Barra superior
      </div>
      <div className="pageName">
        Detalhe do Pedido
      </div>
      <div className="infos">
        <div className="mainInfos">
          <h3>
            {`PEDIDO ${orderNumber}`}
          </h3>
          <h3>
            {`P. Vend: ${orderSeller}`}
          </h3>
          <h3>
            {orderDate}
          </h3>
          <h3>
            {orderStatus}
          </h3>
          <button type="button" onClick={ () => setOrderStatus('ENTREGUE') }>
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <div className="description">
          <p>Item</p>
          <p>Descrição</p>
          <div>
            <p>Quantidade</p>
            <p>Valor Unitário</p>
            <p>Sub-total</p>
          </div>
        </div>
        <CartIten />
        <CartIten />
        <div className="totalValue">
          <h1>{`Total: R$${totalValue}`}</h1>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
