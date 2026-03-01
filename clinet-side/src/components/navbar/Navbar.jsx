import './navbar.scss';
import talktave from "../../assets/talkative-people.jpg"
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import Search from "../search/Search.jsx";
import {Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext.jsx";
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import { motion } from "motion/react"
import avater from "../../assets/avatar-1.png";






const Navbar = () => {
        
    const { toggle, darkMode }  = useContext(DarkModeContext);

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
     console.log(currentUser);
    
    return( 
      <>
        <div className="navbar">
          <motion.div variants={ListvariantsUpper} initial="initial" animate="animate" className="left-side-of-navbar">
            <Link className='the-social-link-one' to="/home"  ><motion.span variants={ListvariantsUpper}>æxodus</motion.span></Link>
             {darkMode ? (
              <motion.div variants={ListvariantsUpper}><WbSunnyOutlinedIcon onClick={toggle} /></motion.div>
                ) : (
              <BedtimeOutlinedIcon onClick={toggle} />
             )}
              <GridViewOutlinedIcon/>
              <motion.div variants={ListvariantsUpper} initial="initial" animate="animate"className="search">
                <Link className='find-me-if-you-can'><SearchOutlinedIcon />
                  <motion.input variants={ListvariantsUpper} type="text"  placeholder='type here.....'/>
                </Link>
              </motion.div>
          </motion.div>
          <motion.div variants={ListvariantsSide} initial="initial" animate="animate" className="right-side-of-navbar">
            <Link className='the-text-chat-one' to="/ess/7f3a9b2c8e1f4d6a0b"><motion.div variants={ListvariantsSide} ></motion.div></Link> 
               <motion.div variants={ListvariantsSide} ><EmailOutlinedIcon /></motion.div>
               <motion.div variants={ListvariantsSide} ><NotificationsOutlinedIcon /></motion.div>
            <motion.div  className="user">
              <Link to={`/Myaccount/${currentUser?.id}`} className='myaccount-link'>
                {currentUser?.profilePic ? (<motion.img src={"./upload/"+currentUser?.profilePic}alt="" />):<motion.img src={avater}alt="" />}
                 <motion.span>{currentUser?.userName}</motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </>
    )
}
export default Navbar ;