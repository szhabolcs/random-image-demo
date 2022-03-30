const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql2');

// use local .env
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  require("dotenv").config({ path: `${__dirname}/.env` });
}
app.use(express.json());

const port = process.env.PORT;

// create the connection to database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });


app.post('/:name', function (req, res) {
    // with placeholder
    conn.query(
        `INSERT INTO likes (link) VALUES (?)`,
        [req.params.name],
        function(err, results) {
            console.log(err);
            console.log(results);
            res.sendStatus(200);
        }
    );
//   res.send('Hello ' + req.params.name);

});

app.listen(port);