import express from 'express';
import { db } from "../connect.js";

const router = express.Router();

router.post("/:messageConvesationId",(req,res)=>{
  const messageConvesationId = req.params.messageConvesationId;
   const { senderID, text}= req.body;
    const storeConversation = "INSERT INTO  dan_messages (message_convesation_id,sender,text)VALUES(?,?,?)";
    db.query(storeConversation,[messageConvesationId,senderID,text],(err,result)=>{
      if(err) return res.status(500).json(err);
      res.status(201).json({id:result.insertId,messageConvesationId,senderID,text});
    });
});
router.get("/:conversationId",(req,res)=>{
  const conversationId = req.params.conversationId;
  const dispalyChat = "SELECT * FROM dan_messages WHERE message_convesation_id = ? ";
  db.query(dispalyChat,[conversationId],(err,data)=>{
  if(err) return res.status(500).json(err);
  res.status(200).json(data);
  });
});

router.get("/each/:conversationId", (req, res) => {
 const conversationId = req.params.conversationId;
  const members = req.query.members?.split(","); 

  const placeholders = members.map(() => "?").join(",");
  const fetchEachChat = `SELECT m.*, u.userName, u.profilePic FROM dan_messages AS m JOIN dan_user_info AS u ON m.sender = u.id WHERE m.message_convesation_id = ? AND m.sender IN (${placeholders}) ORDER BY m.created_at ASC `;

  db.query(fetchEachChat, [conversationId, ...members], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });

});
export default router