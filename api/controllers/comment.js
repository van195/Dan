import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req,res)=>{
    const returnCurrentUserComments = `SELECT c.*, u.id AS user_id, userName, profilePic FROM dan_comments AS c JOIN  dan_user_info  AS u ON (u.id = c.user_id)
        WHERE c.post_id = ? ORDER BY c.createdAt DESC`;
    
        db.query(returnCurrentUserComments ,[req.query.postId],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json(data);
        })
    
}

export const addComment =  async (req,res)=>{
    
    const token_of_comment = req.cookies.accessToken;
    
    if(!token_of_comment) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_comment,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

    const addCurrentUserComment = "INSERT INTO dan_comments (`comment_desc`,`createdAt`,`user_id`,`post_id`) VALUES(?)";
     

    //to make clear


    const values =[
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postId
    ];
    db.query(addCurrentUserComment,[values],(err, data) =>{
        if(err)return res.status(500).json(err);
       
        return res.status(200).json("the comment has been created 👌");
    })


    })
}