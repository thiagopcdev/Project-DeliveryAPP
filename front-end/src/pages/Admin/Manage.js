import React, { useState } from 'react';
import { Navbar, NewUser, ListUsers } from '../../components';
import ProviderUserList from '../../context/ProviderUserList';
import './Manage.css';

function Manage() {
  const [error, setError] = useState('');

  const showError = () => (
    <p data-testid="admin_manage__element-invalid-register">
      Esse usuário já existe!
    </p>
  );

  const showSuccess = () => (
    <p> Usuário cadastrado com sucesso! </p>
  );

  return (
    <ProviderUserList>
      <Navbar type="admin" />
      <main className="admin-page-container">
        <div className={ `error-container-${error}` }>
          {error === 'error' && showError()}
          {error === 'ok' && showSuccess()}
        </div>
        <NewUser setError={ setError } />
        <ListUsers setError={ setError } />
      </main>
    </ProviderUserList>
  );
}

export default Manage;
