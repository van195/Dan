import './profile.scss';
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/posts"
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useContext , useState} from "react";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useLocation } from 'react-router-dom';
import avater from "../../assets/avatar-1.png";
import { useEffect } from 'react';



const Profile =() => {

    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState(null)
  

  const userId = useLocation().pathname.split("/")[2];// this means separete the url by / and return the third element 
  useEffect(()=>{
    const fetchUserProfile = async () => {
      const res = await axios.get(`http://localhost:8800/app/users/find/${userId}`,
                               {withCredentials:true});
                               return  setData(res);
                              
    }; 
    fetchUserProfile();
  },[userId])

  console.log(data);
  
  // FETCHING to display followers  
  const fetchUserFollower = async () => {
      const res = await axios.get("http://localhost:8800/app/relationship?followerUserId="+userId,
                               
                               {withCredentials:true});
                               return res.data;
                              
    }; 

  const {  isPending: relshiploading, data: relationDataFollowers , } = useQuery( 
      { 
        queryKey:['user_relationship',userId],

        queryFn: fetchUserFollower,
      }
  );
  //add following request 

 const addFollow = async (followed) =>{
    if(followed) return await axios.delete("http://localhost:8800/app/relationship?userId="+userId, // it send the post.id to index.js 50
            
          {
            withCredentials:true

          } 
        );
      return  await axios.post("http://localhost:8800/app/relationship", // it send the post.idto index.js 50
            {userId},
            {
              withCredentials:true
            } 
        ); 
    
  
    
};


const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: addFollow
    ,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_relationship"] });
   },
});


  const handleFollow =(e)=>{
   // e.preventDefault();
   mutation.mutate(relationDataFollowers.includes(currentUser?.id));// it will be true or false
  }  
    return(
        <div className="profile">
       <div className="images">
        {data?.profilePic ? (<img src={"./upload/"+data?.profilePic} className="profilePic"/>):(<img src={avater} className="profilePic"/>) }
        
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left-of-profile-page">
            
             <span>{relshiploading ? "loading" :relationDataFollowers.length}</span>
             <h3>Followers</h3>

          </div>
          <div className="center">
            <span>{ data?.userName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Ethiopia</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>dan.dev</span>
              </div>
            </div>
             <button onClick={handleFollow}>{ relshiploading ? "loading": relationDataFollowers.includes(currentUser?.id) ? "Folowing":"Follow"}</button>
          </div>
            <div className="right-of-profile-pafge">
                 
                </div>
          </div>
          <Posts userId = {userId}/>
      </div>
    </div>
    )
}
export default Profile;