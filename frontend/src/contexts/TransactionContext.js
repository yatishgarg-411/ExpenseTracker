import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionDataList, setTransactionDataList] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/transactions/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTransactionDataList(res.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactionDataList, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
