import React from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import currencyFormatter from '../../helper/currencyFormatter';

function SallerTableItems({ array }) {
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Descrição</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Valor Unitário</th>
          <th scope="col">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {array.map((item, index) => {
          const qnt = Number(item.SalesProducts.quantity);
          const totalPrice = Number(item.price) * qnt;
          return (
            <tr key={ index }>
              <th
                scope="row"
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index + 1}`
                }
              >
                {index + 1}
              </th>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index + 1}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index + 1}`
                }
              >
                {qnt }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index + 1}`
                }
              >
                { currencyFormatter(item.price) }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index + 1}`
                }
              >
                { currencyFormatter(totalPrice) }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

SallerTableItems.propTypes = {
  array: arrayOf(shape({
    id: number,
    name: string,
  })).isRequired,
};

export default SallerTableItems;
