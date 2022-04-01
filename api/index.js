const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

// use local .env
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  require("dotenv").config({ path: `${__dirname}/.env` });
}
app.use(express.json());

const port = process.env.PORT;
let conn;

// create the connection to database
(async function() {
	conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });
})();


app.post('/like/:id', async function (req, res) {
    let {id} = req.params;
    let rows, fields;
    [rows, fields] = await conn.execute(`SELECT id FROM likes WHERE id=?`, [id]);
    if(rows.length === 0){
        [rows, fields] = await conn.execute(`INSERT INTO likes (id,nr) VALUES (?,?)`, [id, 1]);
        console.log("Added! " + id );
    }
    else{
      [rows, fields] = await conn.execute(`UPDATE likes SET nr = nr + 1 WHERE id  = (?)`, [id]);
      console.log("Updated: " + id );
    }
    res.sendStatus(200);
});

app.post('/unlike/:id', async function (req, res) {
  let {id} = req.params;
  let rows, fields;
  [rows, fields] = await conn.execute(`SELECT id FROM likes WHERE id=?`, [id]);
  //TODO: check if id exists
  if(rows.length === 0){
      [rows, fields] = await conn.execute(`INSERT INTO likes (id,nr) VALUES (?,?)`, [id, 1]);
      console.log("Error " + id );
  }
  else{
    [rows, fields] = await conn.execute(`UPDATE likes SET nr = nr - 1 WHERE id  = (?)`, [id]);
    console.log("Updated: " + id );
  }
  res.sendStatus(200);
});

app.get('/all-likes', async (req, res) => {
  let {order} = req.query;
  let rows, fields;

  if(order.toLowerCase() === 'asc' ){
    [rows, fields] = await conn.execute(`SELECT * FROM likes WHERE nr>0 ORDER BY nr ASC`);
    res.send(rows);
  }
  else if(order.toLowerCase() === 'desc'){
    [rows, fields] = await conn.execute(`SELECT * FROM likes WHERE nr>0 ORDER BY nr DESC`);
    res.send(rows);
  }
  else{
    res.sendStatus(400);
  }
});




app.listen(port);