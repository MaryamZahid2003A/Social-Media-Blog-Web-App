import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BlogPage from './FrontendComponents/BlogPage';
import Login from './FrontendComponents/Login';
import Signup from './FrontendComponents/Signup';
import MainPage from './FrontendComponents/MainPage';
import Header from './FrontendComponents/Header';
import { ToastContainer } from 'react-toastify';
import './App.css';
import useGlobalStore from './Store/GlobalStore';
import { useEffect } from 'react';
function App() {
  const { fetchUser } = useGlobalStore();

    useEffect(() => {
      fetchUser();  
    }, []);

  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogPage" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
