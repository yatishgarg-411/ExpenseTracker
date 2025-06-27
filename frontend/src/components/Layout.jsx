import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus,List, BarChart3, LogOut, Menu, X, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css'; // Import the custom CSS

const Layout = ({ children }) => {
  
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {setToken}=useAuth();
    const handleLogout = () => {
        // logout();
        setToken('');
        navigate('/');
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Add Transaction', href: '/add-transaction', icon: Plus },
        { name: 'Transactions', href: '/transactions', icon: List },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-root">
            {/* Desktop Sidebar */}
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-header">
                        <Wallet className="wallet-icon1" />
                        <span className="app-title">ExpenseTracker</span>
                    </div>
                    <div className="sidebar-nav">
                        <nav>
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                                    >
                                        <Icon className={`icon ${isActive(item.href) ? 'active-icon' : ''}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut className="icon logout-icon" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-header">
                <div className="mobile-header-inner">
                    <div className="mobile-title">
                        <Wallet className="icon wallet-icon1" />
                        <span className="app-title">ExpenseTracker</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="menu-toggle-btn"
                    >
                        {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <nav>
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                                    >
                                        <Icon className="icon" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut className="icon logout-icon" />
                                Logout
                            </button>
                        </nav>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="main-content">
                <main>
                    <div className="content-container">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
