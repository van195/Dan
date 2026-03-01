/*import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addProfilePic = (req,res)=>{
    const addCurrentUserProfilePic = "INSERT INTO dan_user_info (`profilePic`) VALUES(?)";
     
      const img_of_posts = req.body.img;
    
        db.query(addCurrentUserProfilePic ,[img_of_posts],(err, data) =>{
            if(err)return res.status(500).json(err);
            return res.status(200).json(data);
        })
    
}*/