import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';
import CartFinishButton from './CartFinishButton';

const FormAddress = () => {
  const { setAddressNumber, setAddress, setSeller } = useContext(Context);
  const [sellers, setOptions] = useState([]);
  const [infoToken, setToken] = useState('');

  const getToken = async () => {
    const { token } = await JSON.parse(localStorage.getItem('user'));
    setToken(token);
  };

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axios.get('http://localhost:3001/users?role=seller');
      setOptions(data);
    };
    getToken();
    getOptions();
  }, []);

  return (
    <div
      style={ {
        width: '80vw',
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        borderStyle: 'outset',
        justifyContent: 'center',
        alignItems: 'center' } }
    >
      <div
        style={ {
          width: '80vw',
          height: '40vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center' } }
      >
        <label htmlFor="responsability-sale">
          Vendedora Responsável
          <select
            id="responsability-sale"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => setSeller(target.value) }
          >
            {sellers.map(({ name, id }, index) => (
              <option key={ index } value={ id }>
                {name}
              </option>))}
          </select>
        </label>
        <label htmlFor="responsability-sale">
          Endereço
          <input
            name="address"
            id="responsability-sale"
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setAddress(target.value) }
          />
        </label>
        <label htmlFor="responsability-sale">
          Número
          <input
            name="addressNumber"
            id="responsability-sale"
            data-testid="customer_checkout__input-addressNumber"
            onChange={ ({ target }) => setAddressNumber(target.value) }
          />
        </label>
      </div>
      <CartFinishButton token={ infoToken } />
    </div>
  );
};

export default FormAddress;
