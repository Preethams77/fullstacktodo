// const express = require("express");
// const cors =require("cors")
// const app =express();
// const mysql =require("mysql2")
// app.use(cors());//frntend and backnd are running in 2 diff ports to connect them cors is used
// app.use(express.json());

// const db=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Octavia@345",
//     database:"todo"
// })
// db.connect((err)=>{
//     if(err){
//         console.log("Error connecting to the database");
//         return 
//     }
//     console.log("connected with database")
// })
// app.get("/",(req,res)=>{
//     console.log("Default Route")
//     db.query("select * from todoItems",(err,result)=>{
//         if(err){ 
//             console.log("Error occured",err)
//             return
//         }
//         console.log("Data : ", result);
//         res.send(result);
//     })
// });

// app.post("/add-item",(req,res)=>{

//     console.log(req.body);
   
//     db.query(`insert into todoItems(itemDescription) values("${req.body.text}")`,(err,results)=>{
//          if(err)
//          {
//             console.log("Error occured",err)
//             return
//          }
//          console.log("Created Successfully")
//     })

//          res.send("added successfully!")
// })
// app.put("/edit-item",(req,res)=>{
//      db.query(`update todoItems set itemDescription= "${req.body.itemDescription}" where ID=${req.body.ID};`,(err,results)=>{
//          if(err)
//          {
//             console.log("Error occured",err)
//             return
//          }
//          console.log("Created Successfully")
//     })
//     res.send("Success")

// })
// app.listen(3000,()=>{
//     console.log("Server started running on port 3000")
// })

// //onkeyup="updateTodo(event, ${index})"

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Octavia@345",
  database: "todo"
});

db.connect(err => {
  if (err) {
    console.log("DB connection failed", err);
    return;
  }
  console.log("DB connected");
});

// GET
app.get("/", (req, res) => {
  db.query("SELECT * FROM todoItems", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// ADD
app.post("/add-item", (req, res) => {
  const { text } = req.body;

  db.query(
    "INSERT INTO todoItems (itemDescription) VALUES (?)",
    [text],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Added");
    }
  );
});

// EDIT
app.put("/edit-item", (req, res) => {
  const { ID, itemDescription } = req.body;

  db.query(
    "UPDATE todoItems SET itemDescription = ? WHERE ID = ?",
    [itemDescription, ID],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
});

// DELETE
app.delete("/delete-item/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM todoItems WHERE ID = ?",
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Deleted");
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});