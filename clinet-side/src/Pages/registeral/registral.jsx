import { Link,useNavigate  } from 'react-router-dom';
import './registral.scss';
import { useState } from 'react';
import Axios from "axios"


const Registral = () => {


    const[inputs, setInputs] = useState({
        Username:"",
        Email:"",
        Password:"",
    })


    //error handling what if it occur
    const[err, setErr] = useState(false)
    


      const navigation = useNavigate();
    // to take the value of the user 
    const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     };     
  // make api request to send the data to the backend side
    const handleclick = async (e) => {
       let NAME = inputs.Username;
       let EMA = inputs.Email;
       let PASS = inputs.Password;
        
        e.preventDefault() //cause we don't wanna refresh the page after clicking the button
         if(PASS === "" ||EMA === ""|| NAME === "" ){
           setErr("please fill the fields!");
          return;     
         }
         if(!EMA.includes("@")){
          setErr("invalid email used!");
          return;
         }
         try {
                const res = await Axios.post("http://localhost:8800/app/auth/register", inputs);
                 if(res.status === 201){
                   navigation("/");  
                 }
              } catch (err) {
              setErr(err.response.data);
              return;
            }
                  
    }
  
    return(
     
        <div className="signin">
           <div className="card-of-signin">
               
                
           
             <div className="right-of-sign-up">
                <h1 className="login-title">Join Now</h1>
              
                
                <input type="text" name='Username' placeholder='Jhon ...'  onChange={handleChange}/>
                <input type="email" name='Email' placeholder='Jhon123@gmail.com...' onChange={handleChange} />
                <input type="password" name='Password' placeholder='234redsw@4$....'  onChange={handleChange}/>
                <span>I alredy have an account?<Link className='the-link-one' to="/">Log In</Link></span>
                <button className='loginbnt' onClick = {handleclick}>Join</button>
                  {err && <p style={{ color: "rgba(71, 71, 71, 0.361)",
                                      fontFamily:" 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                      marginTop:"20px",
                   }}>{err}</p>}              
             </div>

             <div className="left-of-signin">
                    <h1 className="the-image-title-signin">Join the squad!</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur quidem corporis repellendus, asperiores libero 
                        ratione facere pariatur explicabo et nam, 
                    </p>
                    <h2 className="get-access-signin">Make New friends</h2>
                    
                   <p>just chil out with your international friends...</p>
                    <button className="register"></button>
               </div>
          </div>   

        </div>
        
    )
}
export default Registral;