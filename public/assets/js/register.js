$(document).ready(function() {
  demo.checkFullPageBackgroundImage();

  setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
  }, 700);

  $('#submit').click(function(){

  	// $.post('https://photoshoot-api.herokuapp.com/credentials/create',
  	// 			{
  	// 				username: $('#username').val(),
  	// 				password: $('#password').val() 
  	// 			},
  	// 			function(result){
  	// 				console.log(result);
  	// 				$("#form").fadeOut("slow", function(){
			// 				$("#done").show().fadeIn("slow", function(){});
			// 			});
  	// 			});



		$.ajax({
			url: 'https://photoshoot-api.herokuapp.com/credentials/create',
			type: 'post',
			headers: {
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vaXMiLCJwYXNzd29yZCI6ImlkaW90IiwiaWF0IjoxNTEyODIyNDMzfQ.cJNzklmBjULMZorw8lM5A0V_WSltmGJ8I8wyazIL7_Y'
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			dataType: 'json',
	    data: {
	    	username: $('#username').val(),
	    	password: $('#password').val() 
	   	},
	    success: function(result) {
	    	console.log(result);
	    }
		});

	});


 //  function submitCredentials(){
	// 	$.ajax({
	// 		url: '/',
	// 		type: 'POST',
	// 		dataType: 'JSON',
	// 		headers: {
	// 			'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vaXMiLCJwYXNzd29yZCI6ImlkaW90IiwiaWF0IjoxNTEyODIyNDMzfQ.cJNzklmBjULMZorw8lM5A0V_WSltmGJ8I8wyazIL7_Y'
	// 		},
	// 		contentType: 'application/json',
	//     data: JSON.stringify({
	//      'username': $('#username').val(),
	//      'password': $('#password').val() 
	//    })
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 	})
	// 	.fail(function(err) {
	// 		console.log(err.status);
	// 	})
	// 	.always(function(){
	// 	});
	// }

});