import React,{useState} from 'react';
import { DollarSign, Calendar, Tag, FileText, Plus } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import './AddTransactionsPage.css';
import { useTransaction } from '../contexts/TransactionContext';
import axios from 'axios';

const AddTransactionPage = () => {

  const token = localStorage.getItem('token');
  const navigate=useNavigate();
  const {fetchTransactions} = useTransaction();

  const [transactionData, setTransactionData] = useState({
    id:'',
    type: 'Income',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // sets the date to today's date in YYYY-MM-DD format
  });


  const handleEditChangeTransaction = (e) => {
    setTransactionData({...transactionData,[e.target.name]:e.target.value});
  };



  const addTransaction=async (e)=>{
    e.preventDefault();
    try{
      const res=await axios.post(`http://localhost:8000/transaction/add`,transactionData,{
        headers: {
          Authorization:`Bearer ${token}`,
        }
      });
      alert(res.data.msg);
      fetchTransactions();
      navigate("/dashboard");
    }catch(error){
      alert(error);
    }

  }



  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <Plus className="header-icon" />
          <h1 className="header-title-addTransaction">Add New Transaction</h1>
        </div>

        <div className="form-wrapper">
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log(transactionData);
          }}>
            <div className="form-group">
              <label className="label">Transaction Type</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type" 
                    value="Income" 
                    checked={transactionData.type === 'Income'} 
                    onChange={handleEditChangeTransaction}
                  />
                  <div className="radio-box">
                    <div className="radio-title">Income</div>
                    <div className="radio-subtitle">Money received</div>
                  </div>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type" 
                    value="Expense" 
                    checked={transactionData.type === 'Expense'} 
                    onChange={handleEditChangeTransaction}
                  />
                  <div className="radio-box">
                    <div className="radio-title">Expense</div>
                    <div className="radio-subtitle">Money spent</div>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="label">Amount</label>
              <div className="input-icon">
                <DollarSign className="forms-icon" />
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="input" 
                  name="amount"
                  value={transactionData.amount}
                  onChange={handleEditChangeTransaction}
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="label">Category</label>
              <div className="input-icon">
                <Tag className="forms-icon" />
                <select 
                  className="input" 
                  name="category"
                  value={transactionData.category}
                  onChange={handleEditChangeTransaction}
                >
                  <option value="">Select a category</option>
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Salary</option>
                  <option>Freelance</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="label">Description</label>
              <div className="input-icon">
                <FileText className="forms-icon top-align" />
                <textarea 
                  rows="3" 
                  className="input" 
                  placeholder="Enter description" 
                  name="description"
                  value={transactionData.description}
                  onChange={handleEditChangeTransaction}
                />
              </div>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="label">Date</label>
              <div className="input-icon">
                <Calendar className="forms-icon" />
                <input 
                  type="date" 
                  className="input" 
                  name="date"
                  value={transactionData.date}
                  onChange={handleEditChangeTransaction}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button type="submit" className="submit-btn" onClick={addTransaction}>Add Transaction </button>
              <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;

