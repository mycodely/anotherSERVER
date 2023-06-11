const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conexión establecida exitosamente!');
});

/* app.get('/users', (req, res) => {
  connection.query('SELECT * from user', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
}); */

app.get('/', (req, res) => {
  connection.query('SELECT * from user', (err, rows) => {
    if (err) throw err;

    const columns = Object.keys(rows[0]);

    res.send(`
      <html>
      <head>
        <title>Tabla de usuarios</title>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${columns.map(column => `<th>${column}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                ${columns.map(column => `<td>${row[column]}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `);
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

/* //queries basicas:
tableOrigin = 'user';
row1 = 'name';

//rename tabla
const rename = `rename table ${tableOrigin} to product`;
//del table
const del = `drop table ${tableOrigin}`;
const newTable = `CREATE table exampleName(
    id int not null auto_increment,
    row1 varchar(50) not null,
    row2 int not null,
    row3 varchar(50) not null,
    primary key (id)
    );`
////////////////////////////////////////////////////////////
//insertar datos
const insert = `INSERT into ${tableOrigin} (id,name,email,password) VALUES (NULL, 'EJEMPLO', 'ejempo@gmail.com', 'ejemplo1234');`;
//del columns with value X
const delRow = `DELETE from ${tableOrigin} where ${row1} = 'example;'`;
// UPDATES
const updValue = `UPDATE ${tableOrigin} set nombre = 'exampleName' where id = 10;`;
const changeColumn = `ALTER TABLE ${tableOrigin} CHANGE ${row1} anotherNameExample VARCHAR(40);`;
const changeColumn2 = `ALTER TABLE ${tableOrigin} RENAME COLUMN ${row1} TO anotherNameExample;`; //without datatype
const addRows = `ALTER TABLE ${tableOrigin} ADD newRowName INT;`;

//////////////////////////////////////////////////////////////////////////////////// */