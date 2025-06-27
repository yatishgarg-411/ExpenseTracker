import React, { createContext, useMemo, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const TransactionContext = createContext();

const computeStats = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const lastMonthIncome = transactions
    .filter(t => t.type === 'Income' && new Date(t.date) >= lastMonth)
    .reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = transactions
      .filter(t => t.type === 'Expense' && new Date(t.date) >= lastMonth)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const lastMonthNet = lastMonthIncome - lastMonthExpenses;

  return { totalIncome, totalExpenses, balance, lastMonthNet };
};

export const TransactionProvider = ({ children }) => {
  const [transactionDataList, setTransactionDataList] = useState([]);
  const {token}=useAuth();

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
  const stats = useMemo(() => computeStats(transactionDataList), [transactionDataList]);


  useEffect(() => {
    if (token) fetchTransactions();
  }, [token]);

  return (
    <TransactionContext.Provider value={{ transactionDataList, fetchTransactions,...stats }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
