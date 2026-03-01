import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getUser = (req,res)=>{
    const userId = req.params.userId;
    const displayUserInfo = "SELECT * FROM dan_user_info WHERE id = ? ";
    db.query(displayUserInfo,[userId],(err,data)=>{
        if(err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
        
    })
    
}
export const getFriendChat = (req,res)=>{
    const friendId = req.params.friendId;
    const displayFriendInfo = "SELECT * FROM dan_user_info WHERE id = ? ";
    db.query(displayFriendInfo,[friendId],(err,data)=>{
        if(err) return res.status(500).json(err);
       // const { password, ...info } = data[0];
        return res.json(data);
        
    })
    
}
export const updateUser = (req,res)=>{

const token_of_post = req.cookies.accessToken;
    
    if(!token_of_post) return res.status(401).json("Not logged in!");


    jwt.verify(token_of_post,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Tokenn is not valid!");

    

    const updateUserInfo = "UPDATE dan_user_info SET `userName`=?, `coverPic`=?,`profilePic`=? WHERE id = ? ";
    
    db.query(updateUserInfo,[
      req.body.changedName,
      req.body.changedCity,
      req.body.img,
      userInfo.id],(err,data)=>{
        
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.json("UPDATED")
        return res.status(403).json("you can update only your postes");
        
    })
    

    })


    
}