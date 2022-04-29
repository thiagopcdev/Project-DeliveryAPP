import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './SellerOrderCard.css';

export default function SellerOrderCard({ id, orderId, status, date, value, address }) {
  return (
    <Link to={ `/seller/orders/${id}` } className="seller-orders-card-container">
      <section className="order-section">
        <div className="order-div">Pedido</div>
        <div
          className="order-key"
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {orderId}
          {' '}
        </div>
      </section>
      <section className="orderInfo-container">
        <div className="statusDataValue-container">
          <section
            className={
              `status-section-${status === 'Em Trânsito' ? 'Transito' : status}`
            }
            data-testid={ `seller_orders__element-delivery-status-${id}` }
          >
            {status}
          </section>
          <div className="data-value-container">
            <section
              className="date-field"
              data-testid={ `seller_orders__element-order-date-${id}` }

            >
              {date}
            </section>
            <section
              className="value-field"
              data-testid={ `seller_orders__element-card-price-${id}` }
            >
              {/* {`R$ ${value}`} */}
              {value}
            </section>
          </div>
        </div>
        <section
          className="address-field"
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          {address}
        </section>
      </section>
    </Link>
  );
}

SellerOrderCard.propTypes = {
  id: number.isRequired,
  orderId: string.isRequired,
  status: string.isRequired,
  date: string.isRequired,
  value: string.isRequired,
  address: string.isRequired,
};
