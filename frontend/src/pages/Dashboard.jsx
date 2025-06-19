import React from 'react'
import "./Dashboard.css";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
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

        </div>
    )
}

export default Dashboard
