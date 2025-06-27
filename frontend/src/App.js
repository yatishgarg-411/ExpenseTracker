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

function App() {
  return (
    <AuthProvider>
    <TransactionProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage/>}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}></Route>
        <Route path="/add-transaction" element={<Layout><AddTransactionPage /></Layout>}></Route>
        <Route path="/transactions" element ={<Layout><TransactionPage/></Layout>}></Route>
        <Route path="/update-transaction" element={<Layout><UpdateTransaction/></Layout>}></Route>
        <Route path='/analytics' element={<Layout><AnalyticsPage /></Layout>}></Route>
      </Routes>
    </BrowserRouter>
    </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
