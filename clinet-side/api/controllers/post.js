
import jwt  from "jsonwebtoken";
import { db } from "../connect.js";
import moment from "moment";


export const getPosts = (req,res)=>{
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in!");


    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const returnCurrentUserPost = userId ? `SELECT p.*, u.id AS user_id, userName, profilePic, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) WHERE p.user_id = ?`:null;
   
    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(returnCurrentUserPost,values,(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })


    })
}
export const getRandomPosts = (req,res)=>{
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in!");


    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const RandomPost = `SELECT p.*, u.id AS user_id, userName, profilePic,post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) LEFT JOIN dan_user_relation AS r ON (p.user_id = r.followed_user_id)`
   
    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(RandomPost,(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })


    })
}
export const getFriend = (req,res)=>{
    const userId = req.query.userId
      const seachedItem = req.query.findItem;

    
    const returnCurrentUserFriends = `SELECT p.*, u.id AS user_id, userName, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) WHERE userName LIKE ?`;
   
   

     const thevalue = `%${seachedItem}%`;
    

    db.query(returnCurrentUserFriends,[seachedItem],(err, data) => {
        if(err)return res.status(500).json(err);
        return res.status(200).json(Array.isArray(data) ? data : [data]);
         
    })


    
}
export const addPosts =  async (req,res)=>{
    
    const token_of_post = req.cookies.accessToken;
    
    if(!token_of_post) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_post,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const addCurrentUserPost = "INSERT INTO dan_posts (`post_desc`,`post_img`,`createdDate`,`user_id`) VALUES(?)";
     

    //to make clear
    const img_of_posts = req.body.img;

    const values =[
        req.body.desc,
        img_of_posts,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
    ]
    db.query(addCurrentUserPost ,[values],(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json("the post has been created 👌");
    })})
}
export const addProfilePicture =  async (req,res)=>{
    
  const img_of_posts = req.body.picture;
  const userId = req.params.id;


  const q = "UPDATE dan_user_info SET profilePic = ? WHERE id = ?";

  db.query(q, [img_of_posts, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Profile picture updated successfully!");
  });
};
    //to make clear
   

    
   

export const updateProfile =  async (req,res)=>{
    
    const token_of_post = req.cookies.accessToken;
    
    if(!token_of_post) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_post,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const updateCurrentUserProfile = "UPDATE dan_user_info SET profilePic = ? WHERE id = ?";
     

    //to make clear
    const {porfileimg }= req.body;
    

    const values =[
        porfileimg,
        userInfo.id
    ]
    db.query(updateCurrentUserProfile ,[values],(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json("the update has been done 👌");
    })})
}