import './App.css'
import { Routes, Route } from 'react-router-dom';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import DashBoard from './page/dashBoard/dashBoard';

function App() {

  return (
   <main>
     <Routes>
       <Route path="signup" element={<Signup/>} />
       <Route path="login" element={<Login/>} />
       <Route path="/" element={<DashBoard/>} />
     </Routes>

   </main>
  )
}

export default App
