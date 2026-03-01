import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cookieParser());

app.use(
   cors({
      origin:"http://localhost:5173",
      Credentials: true,
   })
 );


 

export const register = (req, res) => {
   
    //to grab the user file from the html body
  const { Username, Password, Email } = req.body;

  
  
  //CHECK USER IF EXISTS
  const selectUserName = "SELECT * FROM dan_user_info WHERE userName = ?";
  
  db.query(selectUserName,[Username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Password, salt);

    const insertuesrinfo =
      "INSERT INTO  dan_user_info (`userName`,`email`,`password`) VALUE (?)";

    const values = [
      Username,
      Email,
      hashedPassword,
      
    ];

    db.query(insertuesrinfo, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("User has been created.");
    });
  });

        
};

export const login = (req, res) => {

        const { Username, Password } = req.body;

  if(!Username || !Password) return res.status(400).json("please fill the space!")

console.log(Username);

  const checkUserName = "SELECT * FROM dan_user_info WHERE userName = ?";

  db.query(checkUserName , [Username], async (err, data) => {
    if (err) return res.status(500).json(err);
   
    
    if (data.length === 0) return res.status(404).json("User not found!");


  // we already fetched the user information from db into data[0]

        const users = data[0];
      
        
    const checkPassword = await bcrypt.compare( Password , users.password);

    if (!checkPassword) return res.status(400).json("Wrong password or username!");
     
     const { password, ...others } = data[0];

     // this code use to create token that contain user id , name , and email 
     const token = jwt.sign({id: users.id },"secretkey");
  
      //this code to store encrypted token in cookies 
     res.cookie("accessToken",token, {
        httpOnly: true,
        secure: false, // true if using HTTPS
        sameSite: "lax",
      }).status(200).json(others);
  });
};
/*
 export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};*/