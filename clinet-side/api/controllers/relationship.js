
import { db } from "../connect.js";
import jwt  from "jsonwebtoken";



export const getFollowers = (req,res)=>{

    const getCurrentUserFollowers = "SELECT follower_user_id FROM  dan_user_relation  WHERE followed_user_id = ?";
         const theId = req.query.followerUserId;
        //to make clear
        db.query(getCurrentUserFollowers,[theId],(err,data)=>{            
            if(err)return res.status(500).json(err);
            return res.status(200).json(data.map(dan_user_relation => dan_user_relation.follower_user_id));
            
        })

    
    
    
};

export const followUser=  async (req,res)=>{
    
    const token_of_comment = req.cookies.accessToken;
    
    if(!token_of_comment) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_comment,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

        const addCurrentUserFollow = "INSERT INTO  dan_user_relation (`follower_user_id`,`followed_user_id`) VALUES(?)";
        

        //to make clear


        const values =[
            userInfo.id, // me, my id
            req.body.userId // the one 
        ];
        db.query(addCurrentUserFollow,[values],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("the profile has been followed 👌");
        });


    });

}

export const unfollowUser = (req,res)=>{

  const token_of_comment = req.cookies.accessToken;
    
    if(!token_of_comment) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_comment,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    // we are fetching the whole post info (p.*) but not user-infos cause we don't want that w only need user_id & name
    // so we would like to see our and the post of user that we followed and we have to filter that post

        const deleteFollow = "DELETE FROM dan_user_relation WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
        

        //to make clear

         const theId = req.query.userId

        
     
        db.query(deleteFollow,[userInfo.id,theId],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("the profile has been unfollowed 👌");
        });


    });


    //
        
        //to make clear
        
    
    
    
}
