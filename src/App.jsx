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
      <Routes>
        <Route path='/' element={<Home />} />
       <Route path="/CheckCategory/:name/:id" element={<CheckCategory />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/SignUp/:id' element={<SignUp />} />
        <Route path="/LearningHistory/:id" element={<LearningHistory />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
