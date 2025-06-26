import React, { use } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import axios from'axios';
import { useTransaction } from '../contexts/TransactionContext';
import "./TransactionCard.css";

const TransactionCard = ({ transaction }) => {
  const isIncome = transaction.type === 'Income';
  const {fetchTransactions} = useTransaction();


  const deleteTask = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:8000/transaction/delete/${id}`);
      alert(res.data.msg);
      fetchTransactions();
    }catch(error){
      alert(error);
    }
  }
  return (
    <div className="transaction-card">
      <div className="transaction-content">
        <div className="transaction-main">
          <div className="transaction-left">
            <div className="transaction-header">
              <div
                className={`status-dot ${isIncome ? 'dot-income' : 'dot-expense'}`}
              ></div>
              <div>
                <h3 className="transaction-title">{transaction.description}</h3>
                <p className="transaction-category">{transaction.category}</p>
              </div>
            </div>
            <p className="transaction-date">{transaction.date}</p>
          </div>
          <div className="transaction-right">
            <div className={`transaction-amount ${isIncome ? 'amount-income' : 'amount-expense'}`}>
              {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className="transaction-actions">
              <button className="action-btn edit-btn">
                <Edit2 className="icon" />
              </button>
              <button className="action-btn delete-btn" onClick={()=>deleteTask(transaction.id)}>
                <Trash2 className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
