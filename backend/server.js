//these are api requests to the server


// const http = require('http'); // Import the http module

// http.createServer((request, response) => {//handles the request and provides response
//     response.write('Hello From Node.js!'); // Write a response to the client
//     response.end(); // End the response sends to client
    
// }).listen(3000, () => console.log('Server Is Running on 3000')); // Server listens on port 3000 console logs on vs terminal to confirm its running



//express web application framework for node.js to see the server properly you must use http://localhost:3000/getServerInfo

const express = require('express'); // Import the express module
const app = express(); // Create an instance of express

const mysql = require('mysql2'); // Import the mysql2 module (latest version of mysql)
const db = mysql.createConnection({ // Create a connection to the database
    host: 'localhost', // Database hosted on localhost
    user: 'root', // Database username is root due to mysql being installed locally on the root
    password: 'Calleycat1', // Password for the database
    database: 'forum_app' // Database name in mysql

});

db.connect(err => { // Connect to the database and throw an error if it fails
    if (err) {
        throw err;
    }
    console.log('Successfully Connected To The Database!'); // Console logs in vscode to confirm connection to the database is successful
})


app.get('/getServerInfo', (request, response) => { 
    response.send('Hello From Express!');
})

app.get('/getUsers', (request, response) => {
    db.query('select * from user_tbl', (err, rows) => { // selects all data from the user_tbl in the mysql database and throws an error if it fails
        if (err) {
            throw err;
        }
        response.send(rows); // Send the rows data as a response to the client
    })
})

app.listen(3000, () => console.log('Server Is Running on 3000'));