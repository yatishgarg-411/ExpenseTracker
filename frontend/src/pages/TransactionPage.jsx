import React from 'react';
import { Search, Filter, DollarSign } from 'lucide-react';
import './TransactionPage.css';
import TransactionCard from '../components/TransactionCard'; // Ensure this is a presentational component

const TransactionsPage = () => {
  const dummyTransactions = [
    {
      id: '1',
      type: 'income',
      amount: 5000,
      category: 'Salary',
      description: 'Monthly Salary',
      date: '2025-06-01',
    },
    {
      id: '2',
      type: 'expense',
      amount: 1200,
      category: 'Rent',
      description: 'June Rent',
      date: '2025-06-05',
    },
  ];

  const totalIncome = dummyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = dummyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="transactions-page space-y-6">
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1 className="header-title">All Transactions</h1>
            <p className="header-subtitle">
              Showing {dummyTransactions.length} of {dummyTransactions.length} transactions
            </p>
          </div>
          <div className="header-totals">
            <span className="income">Income: ${totalIncome.toFixed(2)}</span>
            <span className="divider">|</span>
            <span className="expenses">Expenses: ${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="filters-card">
        <div className="search-filter-row">
          <div className="search-input">
            <Search className="icon-left" />
            <input type="text" placeholder="Search transactions..." />
          </div>
          <button className="filter-button">
            <Filter className="icon" />
            Filters
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {dummyTransactions.length === 0 ? (
          <div className="empty-state">
            <DollarSign className="empty-icon" />
            <h3>No transactions found</h3>
            <p>You haven't added any transactions yet.</p>
          </div>
        ) : (
          dummyTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
