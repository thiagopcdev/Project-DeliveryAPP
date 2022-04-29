import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

const DataContext = createContext();

export default function DataProvider({ children }) {
  // const [recipesData, setRecipesData] = useState([]);
  const contextValue = {
    // recipesData,
  };

  return (
    <DataContext.Provider value={ contextValue }>
      { children }
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

DataProvider.propTypes = {
  children: node.isRequired,
};
