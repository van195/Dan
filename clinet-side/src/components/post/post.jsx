import "./post.scss";
import { useQuery } from "@tanstack/react-query";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState,useContext } from "react";
import { useRef } from "react";
import {  motion, useInView } from "motion/react";
import bydefault from "../../assets/flat-illustration-in-grayscale-avatar-user-profile-person-icon-anonymous-profile-profile-picture-for-social-media-profiles-icons-screensaver-free-vector.jpg";


const ListvariantsUpper = {
        initial:{
          y:0,
          opacity:0,
        },
       animate:{
          y:-60,
         opacity:1,
         transition:{
          duration:0.5,
          staggerChildren:0.2,
          }
        }
      };

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();
  const isInView = useInView(ref,{margin:"-70px"}); 
 const fetchUserLikes = async () => {
      const res = await axios.get("http://localhost:8800/app/likes?postId="+post.id,
                               
                               {withCredentials:true});
                               return res.data;
                              
    }; 
    
  //now here we gonna fetch our user post from db right!
  // to make it we gonna use tanStack(react query)
   const { isPending, error, data } = useQuery( 
      { 
        queryKey:['user_likes', post.id],

        queryFn: fetchUserLikes,
      }
  ); 
  
  //adding likes

  const addLike = async (liked) =>{
    if(liked) return await axios.delete("http://localhost:8800/app/likes?postId="+post.id, // it send the post.id to index.js 50
            
          {
            withCredentials:true

          } 
        );
      return  await axios.post("http://localhost:8800/app/likes", // it send the post.idto index.js 50
            {postId : post.id},
            {
              withCredentials:true
            } 
        ); 
    
  
    
};


const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: addLike
    ,
    onSuccess: () => {
      //if anything bad happen it cache the invalidate  to refetch the posts
    queryClient.invalidateQueries({ queryKey: ["user_likes"] });
   },
});


  const handleClicke =(e)=>{
   // e.preventDefault();
   mutation.mutate(data.includes(currentUser.id));// it will be true or false
  }
  

  return (
    <motion.div variants={ListvariantsUpper} animate={isInView ? "animate":"initial"}  className="post" ref={ref}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post?.profilePic ? (<img src={"./upload/"+post?.profilePic}/>):(<img src={bydefault}/>)}
            <div className="details">
              <Link
                to={`/profile/${post?.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userName}</span>
              </Link>
              <span className="date">{moment(post.createdDate).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.post_desc}</p>
          <img src={"./upload/"+post.post_img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isPending ? ("loading" ): data.includes(currentUser?.id) ? <FavoriteOutlinedIcon style={{color:"#000"}} onClick={handleClicke}/> : <FavoriteBorderOutlinedIcon onClick={handleClicke} />}
           {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item"  >
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
      {commentOpen && <Comment postId = {post.id}/>}
      </div>
    </motion.div>
  );
};

export default Post;