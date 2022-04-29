import React, { useCallback, useContext, useEffect, useState } from 'react';
import { func } from 'prop-types';
import api from '../../helper/api';
import Input from '../Basics/Input';
import checkRegister from '../../helper/checkRegister';
import { ContextUserList } from '../../context/ProviderUserList';
import './NewUser.css';

function NewUser({ setError }) {
  const { addNewUser } = useContext(ContextUserList);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [type, setType] = useState('seller');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromLocalStorage) {
      setToken(userFromLocalStorage.token);
    }
  }, []);

  const verifyRegister = useCallback(
    () => {
      const status = checkRegister({ email, name, pass });
      setBtnDisabled(status);
    }, [email, name, pass],
  );

  useEffect(() => {
    verifyRegister();
    // setError('');
  }, [name, email, pass, type, verifyRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password: pass, role: type };

      const { data: { id } } = await api.post('/users/admin', newUser,
        { headers: { Authorization: token } });

      addNewUser({ id, ...newUser });
      // setError('ok');
      setName('');
      setPass('');
      setEmail('');
    } catch (err) {
      setError('error');
    }
  };

  return (
    <div className="newUser-container">
      <p>Cadastrar novo usuário</p>
      <form onSubmit={ handleSubmit } className="fields-container">
        <Input
          name="name"
          id="name"
          type="text"
          label="Nome"
          holder="Nome e Sobrenome"
          value={ name }
          onChange={ setName }
          testId="admin_manage__input-name"
        />
        <Input
          name="email"
          id="email"
          type="email"
          label="Email"
          holder="seu-email@site.com.br"
          value={ email }
          onChange={ setEmail }
          testId="admin_manage__input-email"
        />
        <Input
          name="senha"
          id="senha"
          type="password"
          label="Senha"
          holder="*********"
          value={ pass }
          onChange={ setPass }
          testId="admin_manage__input-password"
        />
        <label htmlFor="role">
          Tipo
          <select
            name="role"
            id="role"
            onChange={ (e) => setType(e.target.value) }
            value={ type }
            data-testid="admin_manage__select-role"
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="submit"
          name="register"
          id="register"
          className={ `btn-register-${btnDisabled}` }
          disabled={ btnDisabled }
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

NewUser.propTypes = {
  setError: func.isRequired,
};

export default NewUser;
