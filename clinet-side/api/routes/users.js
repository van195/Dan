import express from 'express';
import { getUser,updateUser ,getFriendChat} from '../controllers/user.js';


const router = express.Router()

router.get("/find/:userId", getUser );
router.get("/findChat/:friendId", getFriendChat );
router.put("/", updateUser )

export default router;