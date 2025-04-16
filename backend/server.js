//these are api requests to the server


// const http = require('http'); // Import the http module

// http.createServer((request, response) => {//handles the request and provides response
//     response.write('Hello From Node.js!'); // Write a response to the client
//     response.end(); // End the response sends to client
    
// }).listen(3000, () => console.log('Server Is Running on 3000')); // Server listens on port 3000 console logs on vs terminal to confirm its running



//express web application framework for node.js to see the server properly you must use http://localhost:3000/getServerInfo

const express = require('express'); // Import the express module
const app = express(); // Create an instance of express

app.get('/getServerInfo', (request, response) => { 
    response.send('Hello From Express!');
})

app.listen(3000, () => console.log('Server Is Running on 3000'));