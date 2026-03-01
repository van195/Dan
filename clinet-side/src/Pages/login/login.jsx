import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect } from 'react';
import {useState } from 'react';



const Login =() => {


   const[inputs, setInputs] = useState({
        Username:"",
        Password:"",
    });
    

    //error handling what if it occur
    const[err, setErr] = useState(null)
     
    //to navigate the login page to home after validation we use navigation hook
    const navigation = useNavigate()

    // to take the value of the user 
    const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     };   

   const { login, erronUser,currentUser,userStatus } = useContext(AuthContext);

   const handleLogin = async(e) => {
         e.preventDefault()
    try{
       await login(inputs);
       if(userStatus === 200 ){
        return  navigation("/home");
       }
    }catch(err){
      setErr(err.response.data);
      return;
    }
  };
    return(
        <div className="login">
         <div className="card">
            
               
                <div className="left">

                <h1 className="the-image-title">Welcome Back!</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur quidem corporis repellendus, asperiores libero 
                    ratione facere pariatur explicabo et nam, 
                </p>
                <h2 className="get-access">Get a premium access</h2>
               
                <button className="register"></button>
         
            </div>
           
            <div className="right-of-login">
              <h1 className="login-title">Login</h1>
              
                <input type="text" name='Username' placeholder='Jhon ...'onChange={handleChange} />
                <input type="password" name='Password' placeholder='234redsw@4$....' onChange={handleChange}  />
                 <span>Don't you have an account? <Link className='the-link-one' to="/register">Join Us</Link></span>
               <button className='loginbnt' onClick={handleLogin}>Login</button>
               {erronUser && <p style={{ color: "rgba(71, 71, 71, 0.361)",
                                      fontFamily:" 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                      marginTop:"20px",
                   }}>{err}</p>}
              
            </div>
         </div>   

        </div>
    )
}
export default Login;