import "./chatOnline.css"
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";


const ChatOnline =()=>{
return(
    <div className= "ChatOnline">
        <div className="ChatOnline-friend">
            <div className="ChatOnlineImgcontainer">
              <img src={bydefault} alt="" className="ChatOnlineImg" />
                <div className="ChatOnlinebadge">
                
                </div>
            </div>
            <span className="chatonlineText">Abduzarak</span>
        </div>
    </div>
)
} 
export default ChatOnline;