import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./editProfile.scss";
import Pricture from "../../Pages/pp/profilepic.jsx";
import { X } from 'lucide-react';

 const EditProfile = ({setDrop})=>{
    const [updatefile, setUpdateFile] = useState(null);
    const[text, setText] = useState({
        changedName:""
    })



    const upload = async () => {
  try {
      const formData = new FormData();
      formData.append("file", updatefile);//create formdata
       
     // now we gonna send folder e
     const res = await axios.post("http://localhost:8800/upload",formData, {  
       headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
     });
       const thefilename = res.data;
       console.log(thefilename);
       
      return thefilename;
      
    }
    catch (err) {
      console.log(err);
      console.log(updatefile);
    }
  };
  const queryClient = useQueryClient();

 const updateUserInfo = async (users) =>{
        const res = await axios.put("http://localhost:8800/app/posts/updateProfile", // it send the filename to index.js 50 and update only our profile page
            users,
            {
              withCredentials:true
            }
        ); 
        console.log(users);
    return res;
    
};




const mutation = useMutation({
    mutationFn: updateUserInfo
    ,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_update"] });
   },
});




  
const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (updatefile) imgUrl = await upload();// it returns file name 
    mutation.mutate({...text, porfileimg:imgUrl});//our newPost should be a FormData object — not plain JSON so it convart the json file
    setDrop(false)
};
  const handleChange = e => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     };

    return ( 
    <div className="the-popup">
     <button onClick={()=>{setDrop(false)}}><X className="cancel"/></button> 
        <Pricture/>
            </div>
            )
    
 }
 export default EditProfile;