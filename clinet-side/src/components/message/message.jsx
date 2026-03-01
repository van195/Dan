import "./message.css";
import moment from "moment";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";

const Message =({messages, own})=>{
return(
    <div className= {own ? "Message own":"Message"}>
        <div className="message-top">
         <img src={bydefault} alt="" className="messageImg" />
         <span className="messageText">{messages.text}</span>
        </div>
        <div className="message-bottom">
            {moment(messages.created_at).fromNow()}
        </div>
      
    </div>
)
} 
export default Message;