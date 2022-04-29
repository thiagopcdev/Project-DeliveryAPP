import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helper/api';
import { saveUserData } from '../helper/loggedUser';

export default function Register() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [showError, setShowError] = useState('');

  const navigate = useNavigate();

  const verifyRegister = useCallback(
    () => {
      const regexEmail = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      const six = 6;
      const twelve = 12;
      if (regexEmail.test(userData.email)
        && userData.password.length >= six
        && userData.name.length >= twelve) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [userData.email, userData.name.length, userData.password.length],
  );

  const handleInput = ({ target: { id, value } }) => {
    setUserData({ ...userData, [id]: value });
  };

  const handleClick = async () => {
    try {
      const { name, email, password } = userData;
      const { data } = await api.post('/users', { name, email, password });
      saveUserData(data);
      navigate('/customer/products');
    } catch (err) {
      console.error(err);
      setShowError(err);
    }
  };

  useEffect(() => { verifyRegister(); }, [userData, verifyRegister]);

  return (
    <main>
      <form>
        <input
          autoComplete="no"
          type="text"
          data-testid="common_register__input-name"
          placeholder="Name"
          id="name"
          value={ userData.name }
          onChange={ handleInput }
        />
        <input
          autoComplete="no"
          type="email"
          data-testid="common_register__input-email"
          placeholder="Email"
          id="email"
          value={ userData.email }
          onChange={ handleInput }
        />
        <input
          type="password"
          data-testid="common_register__input-password"
          placeholder="Password"
          id="password"
          value={ userData.password }
          onChange={ handleInput }
        />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Register
        </button>
      </form>
      { showError
        && (<p data-testid="common_register__element-invalid_register">Eae</p>) }
    </main>
  );
}
