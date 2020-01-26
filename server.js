
var express = require("express");
var app = express(); //create an app
var itemList = []; // store items on this array

/********************************************************
  *  Configuration
  *******************************************************/

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parser to read info in request
var bparser = require("body-parser");
app.use(bparser.json());

// to server static files (css, js, img, pdfs)
app.use(express.static(__dirname + '/public'))

// to serve HTML
var ejs = require('ejs');
app.set('views', __dirname + '/public'); // where are the HTML files
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

/****************************************************************
*  Web Server Endpoints
*****************************************************************/

app.get('/', (req, res) => {
    res.render('Catalog.html');
});

//this is the end request
//the root page
app.get('/', (req, res) => {
    console.log("Someone wants the root page");
    res.send("Hello my friend!! This is my first server!!");
});

//contact page
app.get('/contact', (req, res) => {
    res.send("This will be the contact page - people working over here!!!");

});

app.get('/aboutme', (req, res) => {
    res.render('about.html');

});


app.get('/exc/:message', (req, res) => {
    console.log("Message from client: ", req.params.message);

    var msg = req.params.message;
    var vowels = '';
    var allVowels = ['a', 'e', 'i', 'o', 'u'];
    //1 travel the msg string and print on the console each letter
    for (var i = 0; i < msg.length; i++) {
        var letter = msg[i];
        console.log(letter);
        //2 check if each letter is a vowel
        //if it is, add the vowel to vowels string
        if (allVowels.indexOf(letter.toLowerCase()) != -1) {
            if (!vowels.includes(letter)) { //3 return each vowel ONLY ONCE
                //Decide 
                vowels += letter;
            }

        }

    }


    res.status(202);
    res.send(vowels);
    //res.send("Thanks for the message");
});


/*****************************************************************************
 *  API End Points
 *****************************************************************************/

app.post('/api/items', (req, res) => {
    console.log("clients wants to store items");

    var item = req.body;
    item.id = itemList.length + 1; // to create a consecutive id
    itemList.push(item);

    res.status(201); // 201 => created
    res.json(item); // return the item as json
    //res.send("OK");
});


app.get('/api/items', (req, res) => {
    res.json(itemList);
});

/******************************************************************************
 *  Start Server
 ******************************************************************************/

//always leave at the end
app.listen(8080, function () {
    console.log("server running at http://localhost:8080"); //local host has IP address 127.0.0.1
    console.log("Press ctrl+C to kill it");
});
