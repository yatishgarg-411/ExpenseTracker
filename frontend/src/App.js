import './App.css';
import LoginPage from"./pages/LoginPage";
import SignUp from"./pages/SignUp";
import Dashboard from"./pages/Dashboard";
import AddTransactionPage from './pages/AddTransactionsPage';
import TransactionPage from './pages/TransactionPage';
import UpdateTransaction from'./pages/UpdateTransaction';
import AnalyticsPage from './pages/AnalyticsPage';
import Layout from './components/Layout';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { TransactionProvider } from './contexts/TransactionContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <TransactionProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage/>}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>}></Route>
        <Route path="/add-transaction" element={<ProtectedRoute><Layout><AddTransactionPage /></Layout></ProtectedRoute>}></Route>
        <Route path="/transactions" element ={<ProtectedRoute><Layout><TransactionPage/></Layout></ProtectedRoute>}></Route>
        <Route path="/update-transaction" element={<ProtectedRoute><Layout><UpdateTransaction/></Layout></ProtectedRoute>}></Route>
        <Route path='/analytics' element={<ProtectedRoute><Layout><AnalyticsPage /></Layout></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
    </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
