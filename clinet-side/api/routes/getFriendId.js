import express from 'express';
import { db } from "../connect.js";

const router = express.Router();

router.get("/:conversationId/:currentUserId", (req, res) => {
  const { conversationId, currentUserId } = req.params;

  const findFriend = `SELECT u.* FROM dan_user_info AS u JOIN dan_conversation_members AS m ON u.id = m.user_id WHERE m.conversation_id = ? AND m.user_id != ?`;

  db.query(findFriend, [conversationId, currentUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data); // only one friend per conversation
  });
})

export default router;