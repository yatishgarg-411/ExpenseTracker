import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { Wallet, TrendingUp, TrendingDown, IndianRupee} from 'lucide-react';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useTransaction } from '../contexts/TransactionContext';

const Dashboard = () => {



const navigate = useNavigate();
const {
    transactionDataList,
    balance,
    totalIncome,
    totalExpenses,
    lastMonthNet,
  } = useTransaction();
  
const {token}=useAuth();
const [userName, setUserName]=useState('');
const recentTransactions = transactionDataList.slice(0, 5);




const fetchUsername = async() => {
    try{
        const decode=jwtDecode(token);
        const email =decode.email;
        const res=await axios.get(`${process.env.REACT_APP_API_URL}/user/login/${email}`);
        setUserName(res.data.name);
    }
    catch(error){
        console.log(error);
    }
}


useEffect(()=>{
    if(token){
        fetchUsername();
    }
},[token])

    return (
        <div className='dashboard-container'>

            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, {userName}! 👋</h1>
                <p className="dashboard-subtitle">Here's your financial overview for today</p>
            </div>

            <div className="statcard-grid">
                <StatCard
                    title="Current Balance"
                    value={balance}
                    Icon={Wallet}
                    color="indigo"
                />
                <StatCard
                    title="Total Income"
                    value={totalIncome}
                    Icon={TrendingUp}
                    color="emerald"
                />
                <StatCard
                    title="Total Expenses"
                    value={totalExpenses}
                    Icon={TrendingDown}
                    color="red"
                />
                <StatCard
                    title="This Month"
                    value={lastMonthNet}
                    Icon={IndianRupee}
                    color="amber"
                />
            </div>

            <div className="quick-actions-container">
                <h2 className="quick-actions-title">Quick Actions</h2>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn emerald" onClick={()=>navigate("/add-transaction")}>Add Transaction</button>
                    <button className="quick-action-btn indigo" onClick={()=>navigate("/transactions")}>View All Transactions</button>
                    
                    <button className="quick-action-btn amber" onClick={()=>navigate(
                        '/analytics'
                    )}> View Analytics</button>
                </div>
            </div>

            <div className="recent-transactions">
                <div className="transactions-header">
                    <h2>Recent Transactions</h2>
                    <Link to="/transactions" className="view-all-link">
                        View all
                    </Link>
                </div>

                {recentTransactions.length === 0 ? (
                    <div className="no-transactions">
                        <div className="icon-placeholder">
                            <IndianRupee className="icon-large" />
                        </div>
                        <p className="no-transactions-text">No transactions yet</p>
                    </div>
                ) : (
                    <div className="transactions-list">
                        {recentTransactions.map((transaction) => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                )}
            </div>



        </div>
    )
}

export default Dashboard
