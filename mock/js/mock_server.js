
var _bkp = $.ajax;

$.ajax = function(o){

	if(o.url === 'register.do'){
	
		/*
			Response format for success:
			
			{
				status: "success"
			}
			
			Response format for error: (Code is optional)
			
			{
				status: "error",
				errors: {
					"412": "DB unavailable",
					"445": "Server unavailable.",
					"122": "Invalide data."
				}
			}
		*/
	
		var successResponse = '{ status: "success" }';
		
		var errorResponse = '{ status: "error", errors: { "412": "DB unavailable", "445": "Server unavailable.", "122": "Invalide data." } }';
	
		try{
			var first_name = o.data.split('&')[0].split('=')[1];
			if(first_name == 'error')
				o.success(errorResponse);
			else
				o.success(successResponse);
		}catch(e){}

	} else {
		_bkp(o);
	}
}