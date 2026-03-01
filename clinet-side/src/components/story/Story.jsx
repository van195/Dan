import { useContext, useState } from "react";
import axios from "axios";
import {useQuery} from '@tanstack/react-query';
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";
import "./story.scss"
import Stories from 'react-insta-stories';
import { AuthContext } from "../../context/authContext.jsx"

const Story = () => {

  const {currentUser} = useContext(AuthContext)
  const[popup, setPopup] = useState(false);
 const [isDark, setIsDark] = useState(false);
  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 5,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 6,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    
  ];
  console.log(stories);
  const fetchUserStory = async (inputs) => {
   const res = await axios.get("http://localhost:8800/app/upload/story",
                                inputs,
                               {withCredentials:true});
    return res.data;
};
 const { isPending, error, data } = useQuery( 
      { 
        queryKey:['user_postes'],

        queryFn: fetchUserStory,
      }
  );

 

  


  
console.log(data)

  return (
    
    <>
    <div className="stories">
     
      <div className="story">
         <img src={bydefault} alt="" />
          <span>{currentUser.userName}</span>
          <button>+</button>
        </div>
      {stories.map(story =>(
        <div className="story" onClick={()=>{setPopup(prev => !prev)}} key={story.id}>
          <img className="the-image-of-story" src={story.img} alt="" />
          <span>{story.name}</span> 
        </div>
       
      ))}
     
       
      
    </div>
      {popup &&  <div className="palying-story">
          <Stories  
          stories = {stories}
            width={300}
           height={500}/>
        </div> }
          
    </>
  )
}

export default Story