//these are api requests to the server


// const http = require('http'); // Import the http module

// http.createServer((request, response) => {//handles the request and provides response
//     response.write('Hello From Node.js!'); // Write a response to the client
//     response.end(); // End the response sends to client
    
// }).listen(3000, () => console.log('Server Is Running on 3000')); // Server listens on port 3000 console logs on vs terminal to confirm its running



//express web application framework for node.js to see the server properly you must use http://localhost:3000/getServerInfo

const express = require('express'); // Import the express module
const app = express(); // Create an instance of express
const cors = require('cors'); // Import the cors module to handle cross-origin resource sharing
const bodyParser = require('body-parser'); // Import the body-parser module to parse incoming request bodies

app.use(cors()); // Use cors to allow cross-origin requests
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies

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

app.post('/login', (request, response) => { // Post request to the login route
    const {username, password} = request.body; // Destructure the username and password from the request body
    console.log(username, password); // Console log the username and password in the terminal to confirm they are being sent from the client

    const sql = 'select * from user_tbl where username = ? and password = ?'; // SQL query selects the user from the database if the username and password match
    db.query(sql, [username, password], (err, result) => { // Execute the SQL query and throw an error if it fails
        if (err) {
            console.log(err);
            return response.status(500).json({message: 'Internal Server Error'}); // Send a 500 status code and internal server error message if there is an error
        }
        if (result.length > 0) { // If the rows length is greater than 0, the user exists in the database
            return response.status(200).json({ // Send a 200 status code and a success message
            success: true,
            message: 'Login Successful!', // Set the message to login successful
            user: result[0] // Set the user to the first row of the result
        });
    }
    else {
        response.json({
            success: false, // Set the success to false
            message: 'User Not Found' 
            } // Send a 404 status code and user not found message if the user does not exist in the database
        );
    }
    })
});


app.post('/register', (request, response) => {
    const {username, password} = request.body;
    console.log(username, password);

    const sql = 'insert into user_tbl (Username, Password) values (?,?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            return response.status(500).json({message: 'Internal Server Error'});
        }
        if (result.insertId) {
            return response.json({
            success: true,
            message: 'Register Successful',
        });
        }
        else {
            response.json({
                success: false,
                message: 'Registration Failed!' 
            }
            );
        }
    })
});

app.post('/addMessage', (request, response) => {
    const { text, author, channelId } = request.body;
    const sql = 'INSERT INTO messages (text, author, channel_id) VALUES (?, ?, ?)';
    db.query(sql, [text, author, channelId], (err, result) => {
        if (err) {
            console.log(err);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
        response.status(200).json({ success: true, message: 'Message added successfully!' });
    });
});

app.listen(3000, () => console.log('Server Is Running on 3000'));