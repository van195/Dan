import express from 'express';
import { db } from "../connect.js";

const router = express.Router();

router.post("/",(req,res)=>{
    const {senderId, receiverId} = req.body;

    const createConv = "INSERT INTO  dan_conversations () VALUES()";
    db.query(createConv,(err,result)=>{
        if(err) return res.status(500).json(err);
        // get the auto-generated Id of the newly created conversation
        const createdConversationId = result.insertId;

        const createMembers = "INSERT INTO dan_conversation_members (conversation_id,user_id)VALUES(?,?),(?,?)";

        db.query(createMembers,[createdConversationId,senderId,createdConversationId,receiverId],(err2)=>{
          if(err2) return res.status(500).json(err2);
          res.status(200).json({createdConversationId,members:[senderId,receiverId]})
        });
    });
});
router.get("/:userId",(req,res)=>{
    const userId = req.params.userId;
    const listChat = "SELECT c.*, GROUP_CONCAT(m2.user_id) AS members FROM dan_conversations AS c JOIN dan_conversation_members AS m1 ON c.id = m1.conversation_id JOIN dan_conversation_members AS m2 ON c.id = m2.conversation_id WHERE m1.user_id = ? GROUP BY c.id";
    
    db.query(listChat,[userId],(err,data)=>{
        if(err) return res.status(500).json(err);
        const formatted = data.map(conv => ({...conv,
                                   members: conv.members.split(",")
             }));
          res.status(200).json(formatted);
    });
});
router.get("/:conversationId/:currentUserId", (req, res) => {
  const { conversationId, currentUserId } = req.params;

  const findFriend = `SELECT u.* FROM dan_user_info AS u JOIN dan_conversation_members AS m ON u.id = m.user_id WHERE m.conversation_id = ? AND m.user_id != ?`;

  db.query(findFriend, [conversationId, currentUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data[0]); // only one friend per conversation
  });
})

export default router;