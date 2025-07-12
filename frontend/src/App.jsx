import { Button } from "@/components/ui/button";
import './App.css';
import Header from "./FrontendComponents/Header";
import MainPage from "./FrontendComponents/MainPage";
import { Route,Routes } from "react-router-dom";
import Login from "./FrontendComponents/Login";
import Signup from "./FrontendComponents/Signup";
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
          </Routes>
        </div>
     </div>
  );
}

export default App;
