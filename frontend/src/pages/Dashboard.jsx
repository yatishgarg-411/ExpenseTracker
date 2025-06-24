import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { Wallet, TrendingUp, TrendingDown, DollarSign} from 'lucide-react';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';

const Dashboard = () => {

    const recentTransactions = [
        
    ];

const navigate = useNavigate();


    return (
        <div className='dashboard-container'>

            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, Yatish! 👋</h1>
                <p className="dashboard-subtitle">Here's your financial overview for today</p>
            </div>

            <div className="statcard-grid">
                <StatCard
                    title="Current Balance"
                    value="500"
                    Icon={Wallet}
                    color="indigo"
                />
                <StatCard
                    title="Total Income"
                    value="500"
                    Icon={TrendingUp}
                    color="emerald"
                />
                <StatCard
                    title="Total Expenses"
                    value="500"
                    Icon={TrendingDown}
                    color="red"
                />
                <StatCard
                    title="This Month"
                    value="500"
                    Icon={DollarSign}
                    color="amber"
                />
            </div>

            <div className="quick-actions-container">
                <h2 className="quick-actions-title">Quick Actions</h2>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn emerald" onClick={()=>navigate("/add-transaction")}>Add Transaction</button>
                    <button className="quick-action-btn indigo" onClick={()=>navigate("/transactions")}>View All Transactions</button>
                    <button className="quick-action-btn amber">View Analytics</button>
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
                            <DollarSign className="icon-large" />
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
