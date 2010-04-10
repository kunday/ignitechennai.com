var Registration = function(){

	var self = this;

	var REGISTRATION_URL = 'register.do';
	var _overlay = $('#overlay');
	var _sidebox = $('#orange_box');
	var _registrationContent = _overlay.find('.registration_content');
	var _thankYouContent = _overlay.find('.thank_you_content');
	var _form = _overlay.find('form').eq(0);
	
	var ErrorManager = function(){
	
		var self = this;
	
		var _container = _overlay.find('.errors');
		var _list = _overlay.find('ul.error_list');
	
		this.show = function(){
			_container.show();
		}
	
		this.hide = function(){
			_container.hide();
		}
		
		this.clearAndHide = function(){
			_list.empty();
			_overlay.find('.error').each(function(){
				$(this).removeClass('error');
			});
			self.hide();
		}
		
		this.add = function(str){
			_list.append('<li>' + str + '</li>');
			self.show();
		}
		
		this.getErrorCount = function(){
			return _list.children().length;
		}
		
		var _init = function(){
			self.clearAndHide();
		}
		
		_init();
	
	}
	
	var errors = new ErrorManager();
	
	this.showOverlay = function(){
		_overlay.show();
		_thankYouContent.hide();
		_registrationContent.show();
		_resetForm();
		$('._flash_content').hide();
	}
	
	this.hideOverlay = function(){
		_overlay.hide();
		$('._flash_content').show();
	}
	
	var _resetForm = function(){
		_form.find('#first_name').val('');
		_form.find('#last_name').val('');
		_form.find('#company_name').val('');
		_form.find('#e_mail').val('');
		_form.find('#attending_as').val('Please Select');
		_form.find('#phone').val('');
		_form.find('#know_about').val('thoughtworker.com');
	}
	
	var _validateForm = function(){
		
		errors.clearAndHide();
		
		//	Check for mandatory fields.
		var mandatoryError = false;
		
		if($('#first_name').val().trim().length === 0){
			mandatoryError = true;
			$('#first_name').addClass('error');
		}
		if($('#last_name').val().trim().length === 0){
			mandatoryError = true;
			$('#last_name').addClass('error');
		}
		if($('#company_name').val().trim().length === 0){
			mandatoryError = true;
			$('#company_name').addClass('error');
		}
		if($('#e_mail').val().trim().length === 0){
			mandatoryError = true;
			$('#e_mail').addClass('error');
		}
		if($('#attending_as').val().trim().length === 0){
			mandatoryError = true;
			$('#attending_as').addClass('error');
		}
		if($('#know_about').val().trim().length === 0){
			mandatoryError = true;
			$('#know_about').addClass('error');
		}
		
		if(mandatoryError)
			errors.add('Please enter all mandatory fields.');
		
		//	Check for valid mail.
		var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
		if(!regex.test($('#e_mail').val().trim())){
			$('#e_mail').addClass('error');
			errors.add('Please enter a valid E-Mail. (example: john.doe@legacy.co.in');
		}
		
		//	Check for valid phone.
		var regex = /^[0-9- ]{5,20}$/;
		if(($('#phone').val().trim().length > 0) && !regex.test($('#phone').val().trim())){
			$('#phone').addClass('error');
			errors.add('Please enter a valid Phone Number. (example: +91-9876543210)');
		}
		
		if(errors.getErrorCount() === 0) {
			errors.clearAndHide();
			return true;
		}
		
		return false;
	}
	
	var showThankYouMessage = function(){
		_registrationContent.hide();
		_thankYouContent.show();
	}
	
	var _bindOverlayControls = function(){
		_sidebox.find('.register').click(function(){
			self.showOverlay();
		});
		_overlay.find('.cancel').click(function(){
			self.hideOverlay();
		});		
		_overlay.find('.close').click(function(){
			self.hideOverlay();
		});
	}
	
	var _bindForm = function(){
		_form.submit(function(){
			if(_validateForm()){
				$.ajax({
					url: REGISTRATION_URL,
					data: _form.serialize(),
					method: 'post',
					success: function(response){
						eval('var response = ' + response);
						if(response.status.trim() === 'success'){
							showThankYouMessage();
						} else if(response.status.trim() === 'error'){
							if(typeof(response.errors) !== 'undefined'){
								for(var error in response.errors){
									errors.add(response.errors[error]);
								}
							}
						}
					},
					error: function(){
						errors.add('Sorry, we\'re unable to process your request at this time. Please try again later.');
					}
				});
			}
			return false;
		});
		
		_overlay.find('.submit').click(function(){
			_form.submit();
		});
	}
	
	var _init = function(){
		_registrationContent.show();
		_thankYouContent.hide();
		self.hideOverlay();
		_bindOverlayControls();
		_bindForm();
		_resetForm();
	}
	
	_init();

}

$(document).ready(function(){
	$(".tweets_container").tweet({
		username: "ignitechennai",
		join_text: "auto",
		avatar_size: 32,
		count: 3,
		auto_join_text_default: "we said,", 
		auto_join_text_ed: "we",
		auto_join_text_ing: "we were",
		auto_join_text_reply: "we replied to",
		auto_join_text_url: "we were checking out",
		loading_text: "loading tweets..."
	});
	
	var reg = new Registration();
	
});