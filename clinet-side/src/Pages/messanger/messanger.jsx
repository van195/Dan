import "./messanger.css";
import Conversatoin from "../../components/conversatoin/Conversatoin";
import Message from "../../components/message/message";
import ChatOnline from "../../components/chatOnline/chatonline";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { useRef } from "react";


const Messanger = ()=>{

  const { currentUser } = useContext(AuthContext);

  const [conversations ,setConversations] = useState([]);
  const [currentChat ,setCurrentchat] = useState(null);
  const [sendNewMessage ,setNewMessage] = useState("");
  const [arrivalMessage ,setArrivalMessage] = useState(null);
  const [currentMessage ,setMessage] = useState(null);
  const [receverId ,setFriend]= useState([]);
  const socket = useRef();

  useEffect(()=>{
    socket.current = (io("ws://localhost:8900"));
    socket.current.on("getMessage",(data)=>{
      setArrivalMessage({
        seneder :data.senderId,
        text:data.text,
      });
    });
  },[]);
 
  const wantedvalue = currentChat?.members[1];
  console.log(wantedvalue);

  useEffect(() => {
    arrivalMessage &&
     currentChat?.members.includes(arrivalMessage.seneder) &&
     setNewMessage((prev) =>[...prev,arrivalMessage]);
  },[arrivalMessage,currentChat]);

  useEffect(()=>{
   socket.current.emit("addUser",
     currentChat?.id,
    wantedvalue,
   
   );
   socket.current.on("getUsers", users =>{
    console.log(users);
   })
  },[currentUser.id]);

  useEffect(()=>{
    const getConversation = async ()=>{
       const res = await axios.get("http://localhost:8800/app/conversations/"+currentUser?.id,
                                {withCredentials:true});
                       setConversations(res.data);

    } 
    getConversation();
  },[currentUser.id])
console.log("conversation",conversations);

  useEffect(() => {
  const getEachMessages = async () => {
    const memberString = currentChat.members.join(","); // "1,7"
    try {
      const res = await axios.get("http://localhost:8800/app/message/each/" + currentChat.id+"?members="+ memberString,
                                {withCredentials:true}
                                );
                              setMessage(res.data);
    } catch (err) {
      console.error(err);
    }
  
  };

  if (currentChat) getEachMessages();
},[currentChat?.id]);

useEffect(()=>{
     const getFriendId = async ()=>{
       const res = await axios.get("http://localhost:8800/app/getFriendId/"+conversations.id +"/"+currentUser.id,
                                {withCredentials:true});
                   return setFriend(res.data);

    } 
    getFriendId();
    },[currentUser.id]);

const handleSendText = async (e)=>{
e.preventDefault();
socket.current.emit("sendMessage",{
 senderId : currentUser.id,
 receiver:receverId,
 text:sendNewMessage,
});
  try {
      const res = await axios.post("http://localhost:8800/app/message/"+ currentChat.id, {
        senderID:currentUser.id,
        text:sendNewMessage,
      },
      {withCredentials:true});
      setMessage([...currentMessage, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
}

  console.log(currentMessage);
  console.log(currentChat);
  console.log(receverId)
   
  return (
    <>
      <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">

                  <input type="text" placeholder=" Search ...." className="chatMenuInput"/>
                  {conversations?.map((c)=>(
                    <div onClick={()=>{setCurrentchat(c)}}>
                      <Conversatoin conversation={c} currentUser={currentUser} key={c.id}/>
                    </div>
                  ))
                  }
                  
                </div>
            </div>
           { currentChat ? (<>
             <div className="chatbox">
               <div className="chatboxWrapper">
                   <div className="chatbox-top">
                      {currentMessage?.map(m =>(
                           <Message  messages ={m} own={m.sender === currentUser.id}/>
                      ))}
                   </div>
                   <div className="chatbox-bottom">
                        <textarea className="chatMessage-input" placeholder=" type something..." value={sendNewMessage} onChange={(e)=>setNewMessage(e.target.value)}></textarea>
                        <button className="chat-submit-button" onClick={handleSendText}><SendOutlinedIcon/></button>
                   </div>
               </div>
             </div>
            </> ):(<span>come on start jenjena....😍😍</span>) }
             <div className="chatonline-part">
                <div className="chatonlineWrapper">
                      
                       < ChatOnline/>
                </div>
            </div>
        
        </div>
     </>  );
}
export default Messanger;