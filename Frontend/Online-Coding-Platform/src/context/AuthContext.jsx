import { createContext, useContext, useState } from 'react';

const MainContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentQuestion, setcurrentQuestion] = useState([]);

  return (
    <MainContext.Provider value={{ currentQuestion, setcurrentQuestion }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
