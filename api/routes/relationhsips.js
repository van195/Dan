import express from "express";
import { followUser, unfollowUser,getFollowers } from "../controllers/relationship.js";


const router = express.Router()
router.get("/", getFollowers)
router.post("/", followUser)
router.delete("/", unfollowUser);


export default router;