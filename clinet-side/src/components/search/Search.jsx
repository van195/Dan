import "./Search.scss";
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
import {Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext.jsx";
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';



const Search = ()=>{

  const { toggle, darkMode }  = useContext(DarkModeContext);
    
  const { currentUser } = useContext(AuthContext);
         
  const [friendName, setFriendname] = useState("");
  const [results, setResults] = useState([]);
  const [err, seterr] = useState([]);
  const [is_loading, setLoading] = useState(false);
    
    const changeHandler = (e)=>{
          const the_input = e.target.value
          setFriendname(the_input);
       }
    
  const handleSearch = async () => {
         
    setLoading(true);
      try{ 
      const res = await fetch("http://localhost:8800/app/search?findItem="+friendName);
                                   const data = await res.json();
                                    setResults(data);
         }catch(err){seterr(err);}
            setLoading(false);
        };

 return(
        <>
            <div className="-search-page">
                <div className="left-side-of-navbar-but-now-for-search">
                  <Link className='the-social-link-one-of-serach-page' to="/"><span>lamasdan</span></Link>
                   <HomeOutlinedIcon/>
    
                  {darkMode ? (
                   <WbSunnyOutlinedIcon onClick={toggle} />
                    ) : (
                   <BedtimeOutlinedIcon onClick={toggle} />
                  )}
                 
                  <GridViewOutlinedIcon/>
                  <div className="search-of-search-page">
                    <SearchOutlinedIcon onClick={handleSearch}/>
                    <input type="text" value ={friendName} placeholder='type here.....' 
                                    onChange={changeHandler}  />
                  </div>
                </div>
                <div className="right-side-of-navbar-of-search-page">
                  <Link className='the-text-chat-one-of-search-page' to="/ess/7f3a9b2c8e1f4d6a0b"><TextsmsOutlinedIcon/></Link> 
                   <EmailOutlinedIcon />
                   <NotificationsOutlinedIcon />
                   <div className="user-of-search-page">
                      <Link to="/Myaccount" className='myaccount-link-of-search'>
                        <img src={bydefault}alt="" />
                        <span>{currentUser?.userName}</span>
                      </Link>
                   </div>
                </div>
            </div>
          <div >
        {is_loading && <p>Loading...</p>}
    {results.map((theFile)=>(
      <div className="summery-part-the-search">
        <div className="the-search-of-friend" key={theFile.id}>
          <div className="dispaly-part-of-search-page">
            <img src={bydefault} alt="" />
            <Link
                to={`/profile/${theFile.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{theFile.userName}</span>
              </Link>
          </div>
        </div>
      </div>))}
      </div>
 </>)
}
  
export default Search;