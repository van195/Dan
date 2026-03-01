import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import authRoutes from "./routes/auths.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import relationshipRoutes from "./routes/relationhsips.js";
import loadRoutes from "./routes/loadstorys.js";
import seachRoutes from "./routes/search.js";
import conversationRoutes from "./routes/conversations.js";
import getFriendIdRoutes from "./routes/getFriendId.js";
import randomGuyRoutes from "./routes/randomGuy.js";
//import profilePicRoutes from "./routes/profilepic.js";
import messageRoutes from "./routes/message.js";





const app = express();

//so we got some middleware
app.use((req,res,next) =>{
   res.header("Access-Control-Allow-Credentials", true)
   next()
})

app.use(cors({
      origin:"http://localhost:5173",
      credentials: true,
   })
 );
app.use(express.json())
app.use(cookieParser());
app.use("/upload", express.static("upload"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../clinet-side/public/upload");// it the destination where the image stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);// to generate a unique name for each of stored image
  },
 
});

const upload = multer({storage:storage});

app.post("/upload",upload.single("file"),(req,res) => {
  const file = req.file;

  if(!file) return res.status(400).json("No file uploaded");
  res.status(200).json(file.filename);
});

app.post("/setProfile",upload.single("file"),(req,res) => {
  const file = req.file;

  if(!file) return res.status(400).json("No file uploaded");
  res.status(200).json(file.filename);
});









app.get("/", (req,res)=>{
   res.send("aselam alekum");
})

 

app.use("/app/users",usersRoutes);
app.use("/app/posts",postsRoutes );
app.use("/app/comments",commentsRoutes);
app.use("/app/likes",likesRoutes);
app.use("/app/auth",authRoutes);
app.use("/app/relationship",relationshipRoutes);
app.use("/app/upload/story",loadRoutes);
app.use("/app/search",seachRoutes);
app.use("/app/conversations",conversationRoutes);
app.use("/app/getFriendId",getFriendIdRoutes);
app.use("/app/message",messageRoutes);
app.use("/app/randomGuy",randomGuyRoutes);
//app.use("/app/picture",profilePicRoutes);

 app.listen(8800,() => {
    console.log("API is working.....😁😁")
    
 })