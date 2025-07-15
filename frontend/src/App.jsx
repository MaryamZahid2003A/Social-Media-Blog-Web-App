import { Button } from "@/components/ui/button";
import './App.css';
import Header from "./FrontendComponents/Header";
import MainPage from "./FrontendComponents/MainPage";
import { Route,Routes } from "react-router-dom";
import Login from "./FrontendComponents/Login";
import Signup from "./FrontendComponents/Signup";
import BlogPage from "./FrontendComponents/BlogPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
     <div className="body">
        <div>
            <Header/>
        </div>
        
        <div>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/blogPage' element={<BlogPage/>}/>
          </Routes>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
     </div>
  );
}

export default App;
