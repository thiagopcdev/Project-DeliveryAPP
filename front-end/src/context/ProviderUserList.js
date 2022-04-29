import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../helper/api';

export const ContextUserList = createContext();

export default function ProviderUserList({ children }) {
  const [usersArray, setUsersArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    setIsLoading(true);
    await api.get('/users')
      .then(({ data }) => {
        setUsersArray(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(`ops! something is wrong: ${err.message}`);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const fetchDeleteUser = useCallback(
    async (userId, token) => {
      await api.delete('/users/admin', { headers: { userid: id, Authorization: token } })
        .then(({ data }) => console.log(data))
        .catch((err) => {
          console.error(`ops! something is wrong: ${err.message}`);
        });

      setUsersArray((oldArray) => {
        const newArray = oldArray.filter((user) => user.id !== Number(userId));
        return newArray;
      });
    }, [],
  );

  const addNewUser = useCallback(
    async (newUser) => {
      const { name, email } = newUser;
      setUsersArray((oldArray) => {
        const ok = oldArray.every((user) => user.name !== name && user.email !== email);

        if (ok) {
          return [...oldArray, newUser];
        }
        return [...oldArray];
      });
    }, [],
  );

  const context = useMemo(() => ({
    usersArray,
    fetchDeleteUser,
    addNewUser,
    isLoading,
    setUsersArray,
  }), [usersArray, fetchDeleteUser, addNewUser, isLoading]);

  return (
    <ContextUserList.Provider value={ context }>
      { children }
    </ContextUserList.Provider>
  );
}

ProviderUserList.propTypes = {
  children: PropTypes.node,
}.isRequired;
