import { db } from "../connect.js";
import jwt  from "jsonwebtoken";



export const getLike = (req,res)=>{

    const getCurrentUserLike = "SELECT user_id FROM dan_likes WHERE post_id = ?";
         const theId = req.query.postId
        //to make clear
        db.query(getCurrentUserLike,[theId],(err,data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json(data.map(like => like.user_id));
            
        })

    
    
    
};
export const addLike=  async (req,res)=>{
    
    const token_of_comment = req.cookies.accessToken;
    
    if(!token_of_comment) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_comment,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

        const addCurrentUserLike = "INSERT INTO  dan_likes  (`user_id`,`post_id`) VALUES(?)";
        

        //to make clear


        const values =[
            userInfo.id,
            req.body.postId
        ];
        db.query(addCurrentUserLike,[values],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("the post has been liked 👌");
        });


    });

}

export const deleteLike = (req,res)=>{

  const token_of_comment = req.cookies.accessToken;
    
    if(!token_of_comment) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_comment,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

        const deleteLike = "DELETE FROM dan_likes WHERE `user_id` = ? AND `post_id` = ?";
        

        //to make clear

         const theId = req.query.postId

        db.query(deleteLike,[userInfo.id,theId],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("the post has been unliked 👌");
        });


    });


    //
        
        //to make clear
        
    
    
    
}
