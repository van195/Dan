import express from 'express';
import { getPosts, addPosts,addProfilePicture,updateProfile,getRandomPosts } from '../controllers/post.js';


const router = express.Router()

router.get("/random", getRandomPosts);
router.get("/", getPosts);
router.post("/Myaccount", addPosts);
router.put("/addProfile/:id", addProfilePicture);
router.put("/updateProfile",updateProfile)



export default router;