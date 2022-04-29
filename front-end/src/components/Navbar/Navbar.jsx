import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUserData } from '../../helper/loggedUser';
import './Navbar.css';

const liProducts = () => (
  <Link to="/customer/products" className="li-order-navbar">
    <li data-testid="customer_products__element-navbar-link-products">
      Produtos
    </li>
  </Link>
);

const liOrders = (type) => (
  <Link to={ `/${type}/orders` } className="li-order-navbar">
    <li data-testid="customer_products__element-navbar-link-orders">
      {type === 'customer' ? 'Meus Pedidos' : 'Pedidos'}
    </li>
  </Link>
);

const liManageUsers = () => (
  <Link to="/admin/manage" className="li-order-navbar">
    <li data-testid="customer_products__element-navbar-link-orders">
      GERENCIAR USUÁRIOS
    </li>
  </Link>
);

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [type, setType] = useState('customer');

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromLocalStorage) {
      setType(userFromLocalStorage.role);
    }
  }, []);

  const getUserName = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
  };

  useEffect(() => { getUserName(); }, []);
  return (
    <nav className="client-order-navbar">
      <ul className="navbar-list-left">
        {type === 'customer' && liProducts()}
        {type !== 'administrator' && liOrders(type)}
        {type === 'administrator' && liManageUsers()}
      </ul>
      <ul className="navbar-list-right">
        <li
          className="user-name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </li>
        <Link to="/login" onClick={ deleteUserData } className="li-order-navbar">
          <li
            className="exit-button"
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </li>
        </Link>
      </ul>
    </nav>
  );
}
