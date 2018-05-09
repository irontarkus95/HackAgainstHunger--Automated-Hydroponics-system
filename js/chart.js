$(function () {

	var socket = io();

	var temp_chart = create_chart('temp-chart', 'Real time temperature data', 
		'Temperature', 'Celcius');

	var hum_chart = create_chart('hum-chart', 'Real time Humidity data',
		'Humidity', '%');

	socket.emit("test_event", {
		test: "This is the test thingy"
	})

	socket.on("new_hum_data", (humdata) => {
		console.log("New humidity data received...");
		console.log(humdata);
		var series = hum_chart.series[0];
		var shift = series.data.length > 200;
		series.addPoint(humdata, true, shift);
	})

	socket.on("new_img_data", (imgdata) => {
		console.log("New image data from img recognition...");
		console.log(data);
	})

	socket.on("new_temp_data", (tempdata) => {
		console.log("New temperature data received...");
		console.log(tempdata);
		var series = temp_chart.series[0];
		var shift = series.data.length > 200;
		series.addPoint(tempdata, true, shift);

	})

})





/*
	When the server connects to the client then the server will start to send data to the client
	from the sensors
*/




// socket.on("another_player_needed", (data) => {
// 	net_status.innerHTML = data.message;
// 	game_status.innerHTML = "You play as X";
// 	player = "X";
// });

// socket.emit("game_end", {
// 			player: player
// });