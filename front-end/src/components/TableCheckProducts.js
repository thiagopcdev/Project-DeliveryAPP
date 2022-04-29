import React, { useContext } from 'react';
import Context from '../context/Context';
import ButtonRemoveToCart from './ButtonRemoveToCart';

const TableCheckProducts = () => {
  const { cart, totalPrice } = useContext(Context);
  return (
    <div style={ { borderStyle: 'outset', alignItems: 'center' } }>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
            <th scope="col">Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={ index }>
              <th
                scope="row"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </th>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {item.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {item.quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { item.price.replaceAll('.', ',') }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { item.subTotal.toFixed(2).replace('.', ',') }
              </td>
              <td>
                <ButtonRemoveToCart index={ index } idProduct={ item.id } />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span>
        <h2 data-testid="customer_checkout__element-order-total-price">
          Total:
          {' '}
          R$
          {totalPrice.toFixed(2).replace('.', ',')}
        </h2>
      </span>
    </div>
  );
};

export default TableCheckProducts;
