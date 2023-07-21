function validateAndSendForm() {
	var error = false; // we will set this true if the form isn't valid

		var name = $('input#name').val(); // get the value of the input field
		if(name == "" || name == " ") {
			$('#err-name').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}

		if (error == true)
		{
			$('.loader').fadeOut('slow');
			return;
		}

		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
		var email = $('input#email').val(); // get the value of the input field
		if (email == "" || email == " " || !email_compare.test(email)) { // check if the field is empty
			$('#err-email').fadeIn('slow'); // error - empty
			error = true;
		}

		if (error == true)
		{
			$('.loader').fadeOut('slow');
			return;
		}

		var data_string = $('#contact-form').serialize(); // Collect data from form

		$.ajax({
			type: "POST",
			url: $('#contact-form').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timeout').slideDown('slow');
				}
				else {
					$('#err-state').slideDown('slow');
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
				$('#contact-form').slideUp('slow');
				$('#ajaxsuccess').slideDown('slow');
			}
		});

		$('.loader').fadeOut('slow');
		return false;
}

jQuery(document).ready(function ($) { // wait until the document is ready
	$('#contact-send-button').click(function(){ // when the button is clicked the code executes
		$('.error').fadeOut('slow'); // reset the error messages (hides them)
		$('.loader').fadeIn('slow', validateAndSendForm);
	});
});
