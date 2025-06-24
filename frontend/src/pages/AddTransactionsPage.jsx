import React from 'react';
import { DollarSign, Calendar, Tag, FileText, Plus } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import './AddTransactionsPage.css';

const AddTransactionPage = () => {
  const navigate=useNavigate();
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <Plus className="header-icon" />
          <h1 className="header-title">Add New Transaction</h1>
        </div>

        <div className="form-wrapper">
          <form className="form">
            {/* Transaction Type */}
            <div className="form-group">
              <label className="label">Transaction Type</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="type" value="income" />
                  <div className="radio-box">
                    <div className="radio-title">Income</div>
                    <div className="radio-subtitle">Money received</div>
                  </div>
                </label>
                <label className="radio-option">
                  <input type="radio" name="type" value="expense" />
                  <div className="radio-box">
                    <div className="radio-title">Expense</div>
                    <div className="radio-subtitle">Money spent</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="label">Amount</label>
              <div className="input-icon">
                <DollarSign className="forms-icon" />
                <input type="number" placeholder="0.00" className="input" />
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="label">Category</label>
              <div className="input-icon">
                <Tag className="forms-icon" />
                <select className="input">
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
                <textarea rows="3" className="input" placeholder="Enter description" />
              </div>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="label">Date</label>
              <div className="input-icon">
                <Calendar className="forms-icon" />
                <input type="date" className="input" />
              </div>
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button type="submit" className="submit-btn">Add Transaction</button>
              <button type="button" className="cancel-btn" onClick={()=>navigate("/dashboard")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;

