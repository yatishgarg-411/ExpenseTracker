import './App.css';
import LoginPage from"./pages/LoginPage";
import SignUp from"./pages/SignUp";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage />}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
