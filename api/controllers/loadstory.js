import jwt  from "jsonwebtoken";
import { db } from "../connect.js";
import moment from "moment";


export const getStory = (req,res)=>{
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in!");


    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const returnCurrentUserPost = userId ? `SELECT p.*, u.id AS user_id, userName, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) WHERE p.user_id = ?`:`SELECT p.*, u.id AS user_id, userName, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) LEFT JOIN dan_user_relation AS r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id =? OR p.user_id =?`;
   
    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(returnCurrentUserPost,values,(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })


    })
}
export const getName = (req,res)=>{
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in!");


    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post


    const returnCurrentUserPost = userId ? `SELECT p.*, u.id AS user_id, userName, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) WHERE p.user_id = ?`:`SELECT p.*, u.id AS user_id, userName, post_img FROM dan_posts AS p JOIN  dan_user_info  AS u ON (u.id = p.user_id) LEFT JOIN dan_user_relation AS r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id =? OR p.user_id =?`;
   
    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(returnCurrentUserPost,values,(err, data) =>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })


    })
}