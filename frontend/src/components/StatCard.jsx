import React from 'react';
import "./StatCard.css"; // Assuming you have a CSS file for styling
const StatCard = ({ title, value, Icon, color, trend }) => {
    const bgColorClasses = {
        indigo: 'bg-indigo',
        emerald: 'bg-emerald',
        amber: 'bg-amber',
        red: 'bg-red',
      };

  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-card-header">
          <div className={`icon-box ${bgColorClasses[color]}`}>
          <Icon className="icon-statcard" stroke="white" size={24} />
          </div>
          <div className="stat-details">
            <p className="stat-title">{title}</p>
            <div className="stat-value">
              {value}
              {trend && (
                <span className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
