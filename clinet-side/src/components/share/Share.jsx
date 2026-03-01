import "./share.scss";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import Dropdown from "../dropdown/dropdown";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';

const Share = () => {

const { currentUser } = useContext(AuthContext);
   
const [openDrop, setDrop] = useState(false);
const [bigfile, setFile] = useState(null);
const [desc, setDesc] = useState("");
const [data, setData] = useState("");
useEffect(()=>{
  const fetchUserProfile = async () => {
      const res = await axios.get(`http://localhost:8800/app/users/find/${currentUser?.id}`,
                               {withCredentials:true});
                               return  setData(res);
                              
    }; 
    fetchUserProfile();
},[currentUser?.id])
// the code down below allow us to put our image in server /upload folder
const upload = async () => {
  try {
      const formData = new FormData();
      formData.append("file",bigfile);//create formdata
     // now we gonna send folder e
     const res = await axios.post("http://localhost:8800/upload",formData,
       {headers: {"Content-Type":"multipart/form-data"}});
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
    
  };
 
const queryClient = useQueryClient();

 const sendPostInfo = async (newPost) =>{
        const res = await axios.post("http://localhost:8800/app/posts/Myaccount", // it send the filename to index.js 50
            newPost,
            {
              withCredentials:true
            }
        ); 
        if(res.status === 200){
          return toast("Posted");
        }
    return res;
};



const mutation = useMutation({
    mutationFn: sendPostInfo,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_postes"] });
   },
});




  
const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (bigfile) imgUrl = await upload();// it returns file name 
    mutation.mutate({desc,img:imgUrl});//our newPost should be a FormData object — not plain JSON so it convart the json file
    setDesc("");                       // newpost send to backend like object form 
    setFile(null);
};

// the animation part 

console.log(currentUser);

  
  return (
    <>

<div className="profile">
         < ToastContainer/>
       <div className="images">
       
        {data?.profilePic ? (<img src={`./upload/${data?.profilePic}`} alt=""  className="profilePic"/>):
             (<img src={bydefault} alt="" className="profilePic"/>)
            }
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left-of-myaccount">
            
            <span>1102</span>
            <span>Followers</span>
          </div>
          <div className="center">
            <span>{currentUser?.userName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser?.coverPic}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>dan.dev</span>
              </div>
            </div>
           
          </div>
           
            <div className="right-of-profile-of-my-account">
                        
                        
                         <span>349</span>
                        <span>Following</span>

                </div>
                <div className="the-right-corner-of-dots">
                  
                    <MoreVertIcon onClick={() => setDrop(prev => !prev)}/>
                    {
                      openDrop && <Dropdown/> 
                    }
                </div>
          </div>
         
      </div>
    </div>

    <div className="share">
      <div className="container-of-share-page">
        <div className="top-of-the-share-page">
          <div className="left-of-share-page">
          {currentUser?.profilePic ? (<img src={currentUser?.profilePic} alt="" />):
             (<img src={bydefault} alt="" />)
            }
           
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser?.userName}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right-of-the-share-page">
            {bigfile && (
              <img className="file" alt="" src={URL.createObjectURL(bigfile)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom-of-the-share-page">
          <div className="left-the-bottom-page-of-post-container">
            <input type="file" id="file" 
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              
            />
            <label htmlFor="file">
              <div className="item-of-share">
                <AddAPhotoOutlinedIcon/>
                <span>Add Image</span>
              </div>
            </label>
            <div className="item-of-share">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item-of-share">
              <LinkOutlinedIcon/>
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right-of-the-bottom-of-the-post-container">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
     <div className="the-right-corner-of-dots">
                    
                    {
                      openDrop && <Dropdown/> 
                    }
                </div>
    </>
  );
};

export default Share;