import "./profilepic.css";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Avater from "../../assets/avatar-1.png";
 import { ToastContainer, toast } from 'react-toastify';

 
 
 
const picture = ()=>{
   const [picture, setPicture] = useState(null);
   const navigation = useNavigate();
   const { currentUser } = useContext(AuthContext);
   const sendPicture = async () => {
     try {
         const formData = new FormData();
         formData.append("file",picture);//create formdata
        // now we gonna send folder e
        const res = await axios.post("http://localhost:8800/setProfile",formData,
          {headers: {"Content-Type":"multipart/form-data"}});
         return res.data;
       }
       catch (err) {
         console.log(err);
       }
     };

const queryClient = useQueryClient();

 const sendPictureInfo = async (newPost) =>{
        const res = await axios.put("http://localhost:8800/app/posts/addProfile/"+currentUser.id, // it send the filename to index.js 50
            newPost,
            {
              withCredentials:true
            }
        ); 
        if(res.status === 200){
            toast("Saved")
        }
    return res;
};

const mutation = useMutation({
    mutationFn: sendPictureInfo,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_picture"] });
   },
});
const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (picture) imgUrl = await sendPicture();// it returns file name 
    mutation.mutate({picture:imgUrl});//our newPost should be a FormData object — not plain JSON so it convart the json file                
};


 return(
    <div className="the-body-part-pic">
      <ToastContainer/>
     <div className="the-card-part-pic">
      {picture ? picture && (
         <img src={URL.createObjectURL(picture)} className="the-image-of-pic" alt="" />
      ) :<img src={bydefault} className="the-image-of-pic" alt="" />}
        
        <input type="file" id="fileInput" onChange={(e) => setPicture(e.target.files[0])}/>
        <label for ="fileInput">Select Photo</label>
        <Link to='/home'>
         <button className="clickonme-pic" onClick={handleClick}>Set as profile</button>
        </Link>
     </div>
    </div>
 )
}
export default picture; 