import mysql from "mysql";


export const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "dan_database"
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully!");
    connection.release();
  }
});






/*
 export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"userinfo"
  });

db.connect((err)=>{
    if(err){
        console.error("not connected", err);
    }else{
        console.log("it connected");
    }
})

*/
