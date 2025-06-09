import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom' // הוספת הייבוא החסר
import LogIn from './Components/LogIn'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
      <nav>
        <NavLink to="/" activeClassName="active">Home  </NavLink>
       <NavLink to="/LogIn" activeClassName="active">Log In  </NavLink>
        {/* <NavLink to="/Cart" activeClassName="active"><CustomizedBadges/></NavLink>  */}
      </nav>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/LogIn' element={<LogIn />} />
        {/* <Route path='/Product' element={<Product/>} />
        <Route path='/Error' element={<Error />} />  */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
