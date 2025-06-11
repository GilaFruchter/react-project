import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import CheckCategory from './Components/CheckCategory';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/LogIn" className={({ isActive }) => isActive ? 'active' : ''}>Log In</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CheckCategory/:name' element={<CheckCategory />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/SignUp/:id' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
