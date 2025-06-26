import React,{ useState ,useEffect} from 'react';
import { Search, Filter, DollarSign } from 'lucide-react';
import './TransactionPage.css';
import TransactionCard from '../components/TransactionCard'; // Ensure this is a presentational component
import { useTransaction } from '../contexts/TransactionContext';

const TransactionsPage = () => {
  const {transactionDataList}=useTransaction();
  const [dummyTransactions,setDummyTransactions]=useState([]);
  useEffect(() => {
    console.log(transactionDataList);
    if (Array.isArray(transactionDataList)) {
      setDummyTransactions(transactionDataList);
    } else {
      setDummyTransactions([]); // fallback to empty
    }
  }, [transactionDataList]);

  const totalIncome = dummyTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = dummyTransactions
    .filter(t => t.type === 'Expense')
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
