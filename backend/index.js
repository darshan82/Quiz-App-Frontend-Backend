const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(cors())



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database:"quiz"
});


app.get("/fetch",(req,res)=>{
console.log(" lal")

let stmt = `SELECT * FROM questions`

connection.query(stmt, function (err, result, fields) {
  if (err) res.status(500);
  console.log(result)
  res.status(200)
  res.send(result)

});

})

app.delete('/quiz/:id', function (req, res) {

  var title = req.params.id;
  let stmt = "DELETE FROM questions WHERE title="+ JSON.stringify(title)
  console.log("Ss",stmt)
 
  connection.query(stmt, function (err, result, ) {
    if (err) {
      console.log(err,"err")
      res.status(400)
    }
      else{

        res.send(result)
        console.log("result",result)
      }
  
  });

  //DELETE YOUR RECORD WITH YOUR PARAM.

})
app.post("/update",(req,res)=>{
  
  let body=req.body
console.log(body)

let stmt = "UPDATE questions SET title="+JSON.stringify(body.title)+",questions="+JSON.stringify(JSON.stringify(body.questions))+"WHERE title="+JSON.stringify(body.oldTitle)

console.log(stmt,"smtp")
  connection.query(stmt, (err, results) => {
    if (err) {
      console.log("error",err)
      return res.status(400);
    }
    // get inserted id
    console.log("results")
    res.status(200)
    res.send()

  });


})
app.post("/add",(req,res)=>{
  
  let body=req.body
  let stmt = `INSERT INTO questions(id,questions,title) VALUES (?, ?,?)`

  let todo=[body.id,JSON.stringify(body.questions),body.text]
  connection.query(stmt, todo, (err, results) => {
    if (err) {
      console.log("error",err)
      return res.status(400);
    }
    // get inserted id
    console.log("results")
    res.status(200)
    res.send()

  });


})
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('databased connected on id ' + connection.threadId);
});
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


