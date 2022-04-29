import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './ClientOrderCard.css';

export default function ClientOrderCard({ id, orderId, status, date, value }) {
  return (
    <Link to={ `/customer/orders/${orderId}` } className="link-container">
      <div className="client-orders-card-container">
        <section className="order-section">
          <div className="order-div">Pedido</div>
          <div
            className="order-key"
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            {orderId}
            {' '}
          </div>
        </section>
        <section
          className={ `status-section-${status === 'Em Trânsito' ? 'Transito' : status}` }
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </section>
        <div className="data-value-container">
          <section
            className="date-field"
            data-testid={ `customer_orders__element-order-date-${id}` }

          >
            {date}
          </section>
          <section
            className="value-field"
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {`R$ ${value}`}
          </section>
        </div>
      </div>
    </Link>
  );
}

ClientOrderCard.propTypes = {
  id: number.isRequired,
  orderId: string.isRequired,
  status: string.isRequired,
  date: string.isRequired,
  value: string.isRequired,
};
