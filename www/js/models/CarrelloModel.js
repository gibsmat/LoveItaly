var autenticazione = function (xhr) {
  var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
  var token = 'Basic '.concat(key64);
  xhr.setRequestHeader('Authorization', token);
}
define(function(require) {

	var Backbone = require("backbone");

	var CarrelloModel = Backbone.Model.extend({

		constructorName: "CarrelloModel",

	});


	return CarrelloModel;
});

