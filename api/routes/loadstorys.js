import express from 'express';
import { getStory, getName } from '../controllers/loadstory.js';


const router = express.Router()

router.get("/",getStory);
router.get("/",getName);


export default router;