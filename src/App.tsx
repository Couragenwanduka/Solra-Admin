import './App.css'
import { Routes, Route } from 'react-router-dom';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import DashBoard from './page/dashBoard/dashBoard';
import ReadPage from './page/dashBoard/screen/readBlog';
import EditImagePost from './page/dashBoard/screen/editBlogPost';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in cookies on page load
    const token = Cookies.get('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
   <main>
     <Routes>
      {
        isLoggedIn? (
          <>
             <Route path="/" element={<DashBoard/>} />
             <Route path="/blog" element={<ReadPage/>} />
             <Route path="/edit/:id" element={<EditImagePost/>} />
          </>
        ) : (
          <>
           <Route path="*" element={<Login/>} />
           <Route path="/signup" element={<Signup/>} />
          </>
        )
      }
     </Routes>

   </main>
  )
}

export default App
