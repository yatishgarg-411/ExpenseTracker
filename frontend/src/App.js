import './App.css';
import LoginPage from"./pages/LoginPage";
import SignUp from"./pages/SignUp";
import Dashboard from"./pages/Dashboard";
import AddTransactionPage from './pages/AddTransactionsPage';
import TransactionPage from './pages/TransactionPage';
import Layout from './components/Layout';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage/>}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}></Route>
        <Route path="/add-transaction" element={<Layout><AddTransactionPage /></Layout>}></Route>
        <Route path="/transactions" element ={<Layout><TransactionPage/></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
