import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { useTransaction } from '../contexts/TransactionContext';





const AnalyticsPage = () => {
    const { balance,totalIncome,totalExpenses,lastMonthNet } = useTransaction();
    const mockAnalytics = {
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        currentBalance: balance,
        expensesByCategory: [
          { category: 'Rent', amount: 2000, percentage: 38.5 },
          { category: 'Food', amount: 1200, percentage: 23.1 },
          { category: 'Travel', amount: 1000, percentage: 19.2 },
          { category: 'Utilities', amount: 600, percentage: 11.5 },
          { category: 'Other', amount: 400, percentage: 7.7 },
        ],
        monthlyData: [
          { month: 'Jan', income: 7000, expenses: 5000 },
          { month: 'Feb', income: 8000, expenses: 5200 },
          { month: 'Mar', income: 8200, expenses: 4800 },
        ],
      };
      
      const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
      
      const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (percent < 0.05) return null;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
            {(percent * 100).toFixed(0)}%
          </text>
        );
      };
 
  const analytics = mockAnalytics;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, #6366f1, #4f46e5)', borderRadius: '1rem', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Financial Analytics 📊</h1>
        <p>Insights into your spending patterns and financial health</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          {
            label: 'Total Income',
            value: `$${analytics.totalIncome.toFixed(2)}`,
            icon: <TrendingUp color="#059669" size={24} />,
            bg: '#d1fae5',
          },
          {
            label: 'Total Expenses',
            value: `$${analytics.totalExpenses.toFixed(2)}`,
            icon: <TrendingDown color="#dc2626" size={24} />,
            bg: '#fee2e2',
          },
          {
            label: 'Net Balance',
            value: `$${analytics.currentBalance.toFixed(2)}`,
            icon: <TrendingUp color={analytics.currentBalance >= 0 ? '#4f46e5' : '#f59e0b'} size={24} />,
            bg: analytics.currentBalance >= 0 ? '#e0e7ff' : '#fef3c7',
          },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, minWidth: '250px', backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: item.bg, padding: '0.75rem', borderRadius: '0.75rem' }}>{item.icon}</div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>{item.label}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Pie Chart */}
        <div style={{ flex: 1, minWidth: '400px', backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <PieChartIcon size={20} color="#4f46e5" style={{ marginRight: '0.5rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Expenses by Category</h2>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {analytics.expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{ flex: 1, minWidth: '400px', backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <BarChart3 size={20} color="#4f46e5" style={{ marginRight: '0.5rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Monthly Income vs Expenses</h2>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Health Indicators */}
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', marginTop: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Financial Health Indicators</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center', padding: '1rem' }}>
            <h3 style={{ color: '#374151' }}>Savings Rate</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
              {((analytics.currentBalance / analytics.totalIncome) * 100).toFixed(1)}%
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>of total income</p>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center', padding: '1rem' }}>
            <h3 style={{ color: '#374151' }}>Expense Ratio</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {((analytics.totalExpenses / analytics.totalIncome) * 100).toFixed(1)}%
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>of total income</p>
          </div>

          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center', padding: '1rem' }}>
            <h3 style={{ color: '#374151' }}>Financial Status</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: analytics.currentBalance >= 0 ? '#059669' : '#dc2626' }}>
              {analytics.currentBalance >= 0 ? 'Positive' : 'Negative'}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>cash flow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
