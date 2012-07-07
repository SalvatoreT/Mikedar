
<!DOCTYPE html>

<?php

// Remember to copy files from the SDK's src/ directory to a
// directory in your application on the server, such as php-sdk/

require './facebook.php';
include './config.php';

?>
<html>
  <head></head>
  <body>
	<div id="fb-root"></div>
	<script>
		window.fbAsyncInit = function() {
		FB.init({
			appId      : <?php echo FACEBOOK_APP_ID; ?>, // App ID
			channelUrl : './channel.html', // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		FB.login(function(response) {
			// handle the response
			FB.api('/me/friends', function(response) {
				// TODO, use this data for the static images
				console.log(response);
			});
		}, {scope: 'friends_relationship_details,friends_about_me'});
		// Additional initialization code here
		};

		function userIdToImage(userId) {
			return 'https://graph.facebook.com'+userId+'/picture';
		} 


		// Load the SDK Asynchronously
		(function(d){
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document));

	</script>
  </body>
</html>

