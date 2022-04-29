import React, { useContext, useEffect, useState } from 'react';
import { func } from 'prop-types';
import './ListUsers.css';
import { ContextUserList } from '../../context/ProviderUserList';

const fetchDelUser = async (id, obj) => {
  const { fetchDeleteUser, token } = obj;
  fetchDeleteUser(id, token);
  // setError('');
};

const deleteUser = ({ target }, obj) => {
  const id = target.attributes.id.value;
  fetchDelUser(id, obj);
};

function ListUsers({ setError }) {
  const { usersArray, fetchDeleteUser, isLoading } = useContext(ContextUserList);

  if (!isLoading) console.log('userarray', usersArray);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromLocalStorage) {
      setToken(userFromLocalStorage.token);
    }
  }, []);

  const obj = { fetchDeleteUser, token, setError };
  if (isLoading) return <h2>Carregando...</h2>;
  return (
    <div className="userList-container">
      <p>Lista de usuários</p>
      <table className="table-container">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usersArray.map(({ id: item, name, email, role: type }, index) => {
            const originalType = type;
            switch (type) {
            case 'customer':
              type = 'Cliente';
              break;
            case 'seller':
              type = 'P.Vendedora';
              break;
            case 'administrator':
              type = 'Administrador';
              break;
            default:
              type = originalType;
              break;
            }

            return (
              <tr key={ item } className="tr-spacer">
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index + 1}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index + 1}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index + 1}` }
                >
                  {email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index + 1}` }
                >
                  {type}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index + 1}` }
                >
                  <button
                    type="button"
                    id={ item }
                    onClick={ (e) => deleteUser(e, obj) }
                    className="btn-delete"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ListUsers.propTypes = {
  setError: func.isRequired,
};

export default ListUsers;
