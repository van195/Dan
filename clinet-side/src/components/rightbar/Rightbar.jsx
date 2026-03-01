import './rightbar.scss';
import talktave from "../../assets/talkative-people.jpg";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





const Rightbar =() => {
    const [entireUser, setUser] = useState(null);
    const [randomUsre, setRandomUser] = useState(null);
  
     useEffect(()=>{
         const getUser = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/app/randomGuy",
                                    {withCredentials:true});
                             return setRandomUser(res.data);
            }
            catch(err){
                console.log(err)
            }
    
        } 
        getUser();
        },[])        
    return(
        <div className="rightbar">
            <div className="container-of-right">
                <div className="items-of-right">
                    <span className='you-may-konw'>you may know</span>
                   
                 </div>
                <div className="items-of-right">
                    {randomUsre?.map((guy)=>(
                   <div className="user-of-right-top" key={guy?.id}>
                        <div className="userInfo">
                           <img src={"./upload/"+guy?.profilePic } alt="" />
                           <Link to={`/profile/${guy?.id}`}
                             style={{ textDecoration: "none", color: "inherit" }}>
                             <span className="name">{guy?.userName}</span>
                            </Link>
                        </div>
                        <div className="buttons-of-right">
                            <Link to={`/profile/${guy?.id}`}>
                             <button>View</button>
                            </Link>
                           
                            <button>Hide</button>
                        </div>
                    </div>))}
                </div>

                <div className="items-of-right-bottom">
                    <span>Grow your friend circle</span>
                    <div className="user-of-right-bottom">
                       
                       <span>Your routine is your story. <br /> Don't be afraid to share it</span>
                    </div>
                     
                </div>

            </div>
        </div>
    )
}
export default Rightbar ;