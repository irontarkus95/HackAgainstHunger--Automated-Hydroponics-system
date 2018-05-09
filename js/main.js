$(function () {
	$table_rows = $("#table-row").find("tr");
	$vid_stream = $("#video-stream");

	$table_rows.on("click", function () {
		console.log(this);

		var plant_name = $(this).children().eq(2).text();
		console.log(plant_name);

		// The following if statements (After future implementation) will tap into the live
		// video stream of the plants based on what is clicked on in the UI


		// Currently, the code will just fetch a livestream from youtube as mock data

		if ($vid_stream.children().length == 0) {
			if (plant_name == "Tomatoes") { add_stream($vid_stream, "https://www.youtube.com/embed/fvVDhp6Tur0?start=6278") }
			if (plant_name == "Lettuce") {  }
			if (plant_name == "Chive") {  }
			if (plant_name == "Pepper") {  }
			if (plant_name == "Parsley") {  } 	
		}
		
	})

	// The below commented lines of code will work after future implementations of the project
	// Will take in the image from the raspberry pi and push the data into the tensorflow model
	// which will return analysis on whether plant is healthy, diseased or affected by pests.

	// var tomato_testing = setInterval(ajax_post, 3000, "/tomato", t_image, tomato_result);
	// var lettuce_testing = setInterval(ajax_post, 3000, "/lettuce", l_image, lettuce_result);
	// var chive_testing = setInterval(ajax_post, 3000, "/chive", c_image, chive_result);
	// var pepper_testing = setInterval(ajax_post, 3000, "/pepper", pepp_image, pepper_result);
	// var parsley_testing = setInterval(ajax_post, 3000, "/parsley", par_image, parsley_result);


	// Currently, we will be making an ajax call to a local server which has a tensorflow model on it. The image will be analyzed there and the results will be returned 




	function add_stream (elem, url) {
		elem.append($('<iframe width="100%" height="100%" src="' + url + '"allowfullscreen></iframe>'));
	}

	function ajax_post (url, image, display_elem) {

		$.ajax({
			type: "POST",
			url: url,
			data: image,
			beforeSend: function () { console.log("Sending over image to tensorflow..."); },
			success: function (data) {
				display_elem.text(data);
			}

		})
	}
	// var inputelem = document.getElementById("upload-image");
	// var i = 0;
	// inputelem.onchange = function (event) {
	// 	var file_list =   inputelem.files;
	// 	console.log(file_list[0]);
	// 	ajax_post('/upload', file_list[i])

	// 	i++;
	// }

	var test = $("#test-model");

	test.on("click", function () {
		$.ajax({
			type: "GET",
			url: "/test-model",
			success: function (data) {
				console.log("Ran successfully");
				console.log(data);
			},
		})
	})

})