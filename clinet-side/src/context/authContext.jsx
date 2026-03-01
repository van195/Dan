import { createContext, useEffect, useState } from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true; 


export const AuthContext = createContext();

const storedUser = (() => {
  const item = localStorage.getItem("user");
  try {
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
})


export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(storedUser);
  const [erronUser, setErronUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);



  const login = async (inputs) => {

    try{
      const res = await Axios.post("http://localhost:8800/app/auth/login",
      inputs,
      {
      wihtCredentials : true,
      }
      );
       setCurrentUser(res.data)
       setUserStatus(res.status)
    }catch(err){
      setErronUser(err);
    }
    
  };

  useEffect(() => {

    if(currentUser){
       localStorage.setItem("user", JSON.stringify(currentUser));
    }else{
      localStorage.removeItem("user");
    }
   
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ userStatus,erronUser,currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};