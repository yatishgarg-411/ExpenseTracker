import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, DollarSign, ChevronDown } from 'lucide-react';
import './TransactionPage.css';
import TransactionCard from '../components/TransactionCard';
import { useTransaction } from '../contexts/TransactionContext';

const TransactionsPage = () => {
  const { transactionDataList } = useTransaction();
  const [dummyTransactions, setDummyTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (Array.isArray(transactionDataList)) {
      setDummyTransactions(transactionDataList);
    } else {
      setDummyTransactions([]);
    }
  }, [transactionDataList]);

  const totalIncome = dummyTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = dummyTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Filter by category first
  const categoryFiltered = selectedCategory
    ? dummyTransactions.filter(t => t.category === selectedCategory)
    : dummyTransactions;

  // Then filter by search query (description)
  const filteredTransactions = categoryFiltered.filter(t =>
    searchQuery
      ? t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === 'All' ? '' : category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="transactions-page space-y-6">
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1 className="header-title">All Transactions</h1>
            <p className="header-subtitle">
              Showing {filteredTransactions.length} of {dummyTransactions.length} transactions
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
          {/* Search */}
          <div className="search-input">
            <Search className="icon-left" />
            <input
              type="text"
              placeholder="Search descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="custom-dropdown" ref={dropdownRef}>
            <button
              className="filter-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedCategory ? (
                <span>{selectedCategory}</span>
              ) : (
                <>
                  <Filter className="icon" />
                  Filter
                </>
              )}
              <ChevronDown className="chevron-icon" />
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleCategorySelect('All')}>All Categories</li>
                <li onClick={() => handleCategorySelect('Food')}>Food</li>
                <li onClick={() => handleCategorySelect('Rent')}>Rent</li>
                <li onClick={() => handleCategorySelect('Salary')}>Salary</li>
                <li onClick={() => handleCategorySelect('Freelance')}>Freelance</li>
                <li onClick={() => handleCategorySelect('Other')}>Other</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="transactions-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <DollarSign className="empty-icon" />
            <h3>No transactions found</h3>
            <p>
              {searchQuery || selectedCategory
                ? `No transactions matching your filters.`
                : "You haven't added any transactions yet."}
            </p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
