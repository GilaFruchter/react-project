import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import CheckCategory from './Components/CheckCategory';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import './App.css';
import LearningHistory from './Components/LearningHistory';
import AdminDashboard from './Components/AdminDashboard';

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
        <Route path="/LearningHistory" element={<LearningHistory />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
