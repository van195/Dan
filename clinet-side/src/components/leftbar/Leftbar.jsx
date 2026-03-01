import './leftbar.scss';
import talktave from "../../assets/talkative-people.jpg";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
//import Frirend from "../../assets/1.png";
import Event from "../../assets/events.png";
import Market from "../../assets/replacement-of-markt.png";
import Watch from "../../assets/live-chat-.png";
import Memory from "../../assets/save-instagram.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Video from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutrials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import Frirend from "../../assets/friend-icone-replacement.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import avater from "../../assets/avatar-1.png";




const Leftbar =() => {
   // the code down below return current user info in array form
      const { currentUser } = useContext(AuthContext);
      const ListvariantsUpper = {
        initial:{
          y:-100,
          opacity:0,
        },
       animate:{
          y:0,
         opacity:1,
         transition:{
          duration:1,
          staggerChildren:0.2,
          }
        }
      };
      const ListvariantsSide = {
        initial:{
          x:-100,
          opacity:0,
        },
       animate:{
          x:0,
         opacity:1,
         transition:{
          duration:1,
          staggerChildren:0.2,
          }
        }
      };

    return(
        <div className="the-leftbar">
            <div className="container">
                <motion.div  variants={ListvariantsSide} initial="initial" animate="animate" className="menu">
                    <motion.div variants={ListvariantsSide} className="user">
                        {
                        currentUser?.profilePic ? (<motion.img variants={ListvariantsSide} src={"./upload/"+currentUser?.profilePic} alt="" />):
                         <motion.img variants={ListvariantsSide} src={avater} alt="" />
                        }
                         <motion.span variants={ListvariantsSide}>{currentUser?.userName}</motion.span>
                    </motion.div>
                    <Link className='the-page-of-explore' to="/home" >
                        <motion.div variants={ListvariantsSide} className="item selected">
                            <motion.img variants={ListvariantsSide} src={Frirend} alt="" />
                            <motion.span variants={ListvariantsSide}>Explore</motion.span>
                        </motion.div>
                    </Link>
                   <Link className='event-clikc' to="/event" >
                        <motion.div variants={ListvariantsSide} className="item">
                            <motion.img variants={ListvariantsSide} src={Event}alt="" />
                            <motion.span variants={ListvariantsSide} >Event</motion.span>
                        </motion.div>
                    </Link>
                    <motion.div variants={ListvariantsSide}  className="item">
                        <motion.img variants={ListvariantsSide}  src={Market} alt="" />
                        <motion.span variants={ListvariantsSide} >Market</motion.span>
                    </motion.div>
                    <motion.div variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide} src={Watch }alt="" />
                        <motion.span variants={ListvariantsSide} >Live Chat</motion.span>
                    </motion.div>
                    <motion.div variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide}  src={Memory} alt="" />
                        <motion.span variants={ListvariantsSide} >Save</motion.span>
                    </motion.div>
                </motion.div>
                <hr />
                <motion.div variants={ListvariantsSide}  initial="initial" animate="animate"className="menu">
                    <span variants={ListvariantsUpper}  initial="initial" animate="animate">Your shortcut</span>
                
                    <motion.div variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide} src={Gaming } alt="" />
                        <motion.span variants={ListvariantsSide} >Gaming</motion.span>
                    </motion.div>
                    <motion.div variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide} src={Fund}alt="" />
                        <motion.span variants={ListvariantsSide} >Fund</motion.span>
                    </motion.div>
                    <motion.div variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide} src={Courses} alt="" />
                        <motion.span variants={ListvariantsSide} >Courses</motion.span>
                    </motion.div>
                    <motion.div  variants={ListvariantsSide} className="item">
                        <motion.img variants={ListvariantsSide} src={Tutrials }alt="" />
                        <motion.span variants={ListvariantsSide} >Tutrials </motion.span>
                    </motion.div>
                </motion.div>
                <hr />
                
                
            </div>
        </div>
    )
}
export default Leftbar ;