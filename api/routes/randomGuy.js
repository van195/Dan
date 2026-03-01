import express from 'express';
import { db } from "../connect.js";

const router = express.Router();

router.get("/", (req, res) => {

  const EntireUser = `SELECT * FROM dan_user_info ORDER BY RAND() LIMIT 3`;

  db.query(EntireUser, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data); 

  });
})

export default router;