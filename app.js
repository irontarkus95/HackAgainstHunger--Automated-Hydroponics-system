// Modules------------------------------------------------
var express = require("express");
var bodyparser = require("body-parser");
var socket = require("socket.io");
// var fs = require("fs");

// Init and middleware------------------------------------
var app = express();
// var urlencodedparser = bodyparser.urlencoded({extended: false});
var jsonparser = bodyparser.json();
app.use(express.static(__dirname));

var server = app.listen(3000, function () {
	console.log("Listening on port 3000 :D");
})

var io = socket(server);

 
var PythonShell = require('python-shell');
var pyshell = new PythonShell('classify.py');
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});
 
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
});

app.get("/hum_data", jsonparser, (req, res) => {
	console.log(req.body);
})


io.on("connection", (socket) => {
	console.log("Client " + socket.id + " has connected to the server");

	// May or may not be used anymore -------------------------------------------------------

	// socket.on("test_event", (data) => {
	// 	console.log("Received the following from the client...");
	// 	console.log(data);
	// });

	// socket.on("pi_temp", (data) => {
	// 	// handle temp data
	// 	console.log("incoming temperature data...");
	// 	socket.emit("new_temp_data", {
	// 		data: data
	// 	})

	// 	var dateString = getDateString();
	// 	// write data to file
	// 	let text_obj = JSON.stringify({
	// 		date: dateString,
	// 		temp: data
	// 	})

	// 	// if (fs.existsSync("pi_temp.txt"))

	// 	console.log("Writing to file");
	// 	fs.appendFile("pi_temp.txt", text_obj + "\n", (err) => {
	// 		if (err) throw err;
	// 	});
	// })

	// socket.on("pi_hum", (data) => {
	// 	// handle humidity data
	// 	// write data to file
	// 	socket.emit("new_hum_data", {
	// 		data: data
	// 	})

	// 	var dateString = getDateString();
	// 	let text_obj = JSON.stringify({
	// 		date: dateString,
	// 		temp: data
	// 	}) 
	// })

	// MOCK DATA, WILL GET DATA FROM RASPBERRY PI IN THE FUTURE
	// Making sure that the charts are working

	var y = 0;
	var temp_timer = setInterval(function () {
		socket.emit("new_temp_data", {
			x: new Date() * 1,
			y: 30 + ((Math.random() * 100) / 10)
		})

		y++;
	}, 1000);

	var hum_timer = setInterval(function () {
		socket.emit("new_hum_data", {
			x: new Date() * 1,
			y: 90 + ((Math.random() * 100) / 10)
		})
	}, 1000);


})

// -----------------------------------------------------------------------------------

function getDateString() {
	let today = new Date();
	let dateString = today.getDate() + "-" +
		(today.getMonth() + 1) + "-" + today.getFullYear() + " " + 
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	return dateString;
}



// io.on("connection", (socket) => {

// 	/*
// 		NOTE:
// 			App does not know when a connection is broken, so closed tabs are stll counted
// 			as players on the server.
// 	*/

// 	console.log("User " + socket.id + " has connected");
// 	client_count++;
// 	if (client_count < 2) {
// 		socket.emit("another_player_needed", {
// 			message: "Waiting for another player to connect..."
// 		});
// 	} else {
// 		socket.emit("found_another_player", {
// 			message: "Paired with another player!"
// 		});
// 		console.log("Matchmaking successful");
// 		io.sockets.emit("game_start")
// 		client_count = 0;
// 	}

// 	socket.on("turn_end", (data) => {
// 		console.log(socket.id + " has contacted the server...");
// 		socket.broadcast.emit("enemy_move", data);
// 	});

// 	socket.on("game_end", (data) => {
// 		io.sockets.emit("game_end", data);
// 	});
// });

