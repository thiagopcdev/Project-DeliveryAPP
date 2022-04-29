import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import Context from '../context/Context';
import api from '../helper/api';
import { checkIfLogged, getUserRole, saveUserData } from '../helper/loggedUser';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState('');
  // const { setLoggedUser } = useContext(Context);

  const navigate = useNavigate();

  const verifyLogin = useCallback(() => {
    const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const six = 6;
    if (regexEmail.test(loginData.email) && loginData.password.length >= six) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginData.email, loginData.password.length]);

  const handleInput = ({ target: { id, value } }) => {
    setLoginData({ ...loginData, [id]: value });
  };

  const handleClick = async () => {
    try {
      const { email, password } = loginData;
      const { data } = await api.post('/login', { email, password });
      saveUserData(data);
      let redirectLink = '';
      switch (data.role) {
      case 'administrator':
        redirectLink = '/admin/manage';
        break;
      case 'seller':
        redirectLink = '/seller/orders';
        break;
      default:
        redirectLink = '/customer/products';
        break;
      }

      navigate(redirectLink);
    } catch (err) {
      console.error(err);
      setShowError(err);
    }
  };

  useEffect(() => {
    if (checkIfLogged()) {
      const userRole = getUserRole();
      let redirectLink = '';
      switch (userRole) {
      case 'administrator':
        redirectLink = '/admin/manage';
        break;
      case 'seller':
        redirectLink = '/seller/orders';
        break;
      default:
        redirectLink = '/customer/products';
        break;
      }

      navigate(redirectLink);
    }
  });

  useEffect(() => { verifyLogin(); }, [loginData, verifyLogin]);

  return (
    <main>
      <form>
        <input
          autoComplete="no"
          type="email"
          data-testid="common_login__input-email"
          placeholder="Email"
          id="email"
          value={ loginData.email }
          onChange={ handleInput }
        />
        <input
          type="password"
          data-testid="common_login__input-password"
          placeholder="password"
          id="password"
          value={ loginData.password }
          onChange={ handleInput }
        />
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Login
        </button>
      </form>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('/register') }
      >
        Register
      </button>
      { showError && (<p data-testid="common_login__element-invalid-email">Eae</p>) }
    </main>
  );
}
