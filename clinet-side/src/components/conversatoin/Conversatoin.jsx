import "./conversatoin.css";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import { useEffect, useState } from "react";
import axios from "axios";


const Conversatoin =({conversation , currentUser})=>{
    const [user ,setUser]=useState(null);
    const [friendId ,setFriend]= useState([]);
    useEffect(()=>{
     const getFriendId = async ()=>{
       const res = await axios.get("http://localhost:8800/app/conversations/" + conversation.id +"/"+ currentUser.id,
                                {withCredentials:true});
                   return setFriend(res.data) 

    } 
    getFriendId();
    },[currentUser.id]);
      console.log("adaefaf");

      
      
    useEffect(()=>{
     const getUser = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/app/users/findChat/"+friendId?.id,
                                {withCredentials:true});
                         return setUser(res.data[0]);
        }
        catch(err){
            console.log(err)
        }
       

    } 
    getUser();
    },[friendId?.id])
    console.log(friendId)
    console.log(user)
return(
    <div className="Conversatoin">
        <img src={bydefault} alt="" className="ConversatoinImg" />
        <span className="ConversatoinName">{user?.userName}</span>
    </div>
)
} 
export default Conversatoin;