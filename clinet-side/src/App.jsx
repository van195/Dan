
import { BrowserRouter, Routes, Route ,Outlet, Navigate} from 'react-router-dom';
import './App.css'
import './style.scss'
import Login from "./Pages/login/login"
import Registral from "./Pages/registeral/registral"
import Leftbar from "./components/leftbar/Leftbar"
import Navbar from "./components/navbar/Navbar"
import Rightbar from "./components/rightbar/Rightbar"
import Profile from './Pages/profile/profile';
import Home from './Pages/home/Home';
import Pricture from "./Pages/pp/profilepic"
import MarketPlace from './components/marketplace/Marketplace';
import Messanger from "./Pages/messanger/messanger"
import Explore from "./components/Explore/Explore";
import Search from "./components/search/Search"
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/authContext";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Share from './components/share/Share';






function App() {
   //to controll the output of user
   const {currentUser} =  useContext(AuthContext);
   //the dark-mode hell....
  const { darkMode } = useContext(DarkModeContext);
   //fetch---
  const queryClient = new QueryClient()

  const Layout = () => {
    return(
      <>
      <div className="the-major">
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        
        <div style={{display:"flex"}}>
         
          <Leftbar/>
          <div style={{flex:6}}>
             <Outlet/>
          </div>
          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>
      </div>
      
      </>
    );
  };
 

    
const ProtectedRoute = ({ children })=> {
    if (!currentUser){
      return <Navigate to="/login"/>;
    }
    return children;
  };
 


//{currentUser ? <Redirect to="/" />:<Redirect to="/login" />}  currentUser ? <Navigate to="/login"/>:<Navigate to="/"/>

  return (
    
    <BrowserRouter>
      
        <Routes>
        <Route path="/register" element={<Registral/>}/>
        <Route path="/" element={<Login/>}/>
         <Route path="/Search" element={<Search/>}/>
         <Route path="/pp" element={<Pricture/>}/>
         <Route path="/ess/7f3a9b2c8e1f4d6a0b" element={
         
           <Messanger/>
  
         }/>
        <Route path="/" element={
           <Layout/>
        }
         children = {[
          <Route path="/home" element={<Home/>}/>,
          <Route path="/Myaccount/:id" element={<Share/>}/>,
          <Route path="/event" element={<MarketPlace/>}/>,
          <Route path="/b2cexplored6a0b/%a9b2c8e1f4" element={<Explore/>}/>,
          <Route path="/profile/:id" element={<Profile/>}/>
        ]}/>
       
       </Routes>
    </BrowserRouter>
     
    
  )
}

export default App;
