//File that stores all the global variables

//get container for our canvas
//const sketchContainer = document.getElementById("sketch-container");

//const { render } = require("ejs");

//get socket which only uses websockets as a means of communication
//everybody wrote script


//the p5js sketch


// ----------------- create variables

//arrays that store entities
let positions = {};
let localFoodList = [];
let localPlayerData = {};
let lasers = [];

//laser variables
let lastShotTime = 0;
let lastHitTime = 0;
let canShoot;
// let numberOfPlayers = 0;
let laserThatLastHitThePlayer;
let bulletCounter = 0;

//new variables?
let newLaser = [-1, -1];
let newPoints;
let newMoney;

//audio
var diesound = new Audio('/sound/die.wav');
var bidensong = new Audio('/sound/the_song.wav');


//boundary width and height
var boundaryX = 2000;
var boundaryY = 2000;



//idea: master list of every single entity in the game

//rows are for global Id, columns are local ID

// indexed by: entityList[globalId][localId]
//server globalID is 0

//operations: 
//Create entity: tells the server to push to the list (globaId array) with the specified data
//Destroy entity: tells the server to remove a local index from the list
//Update entity: tells the server to replace the contents of specified index 

//entityList is overriden every frame by the server

//for bullets, which are not stored by the server (and other entities which are computed locally)


//in the client code: 
//entityList is iterated over and any necessary updates/renders are made

// its like garbagew collection but for lasers
let laserCollection = [-1, -1]


//mouseAngle
mouseAngle = 0

// steven
let clientname = "";
while (clientname.length < 1 || clientname.length > 30) {
  clientname = window.prompt("what is ur name (max length is 30 characters)", "Name");
}

var clientid;

var clientPlayer = new Player(clientname, window.innerWidth / 2, window.innerHeight / 2, lastShotTime, 100, 25, clientid, 0, 0, 0, 5, 10, false, [0]);
