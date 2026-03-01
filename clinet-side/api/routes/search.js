import express from 'express';
import { getFriend } from '../controllers/post.js';


const router = express.Router()

router.get("/",getFriend);



export default router;