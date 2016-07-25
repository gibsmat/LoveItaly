define(function(require) {
    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var UserModel = require("models/UserModel");
    var MyMenuLog = require("views/pages/MyMenuLog");

    var md5 = require("md5");
    var MyMenuNoLog = Utils.Page.extend({
        constructorName: "MyMenuNoLog",
        initialize: function() {
            this.template = Utils.templates.menunolog;
        },

        // localStorage: new Backbone.LocalStorage("loc"),
        events: {
            "tap #regg": "registrazione",
            "tap #log": "login"
        },
        id: "mymenu",
        registrazione: function() {
            $("#he2").removeClass();
            $("#he3").removeClass(); //div input
            $("#he4").removeClass(); //input
            $("#he5").removeClass(); //cerc
            $("#he6").removeClass(); //cerca
            $("#menusup").removeClass();
            $('.menu').animate({
                "left": "-100%"
            }, 250);
            $(".content").css("overflow-y", "auto");
            Backbone.history.navigate("registrazione", {
                trigger: true
            });
        },
        login: function(e) {
            //  Backbone.history.navigate("menulog", {
            //     trigger: true
            //});         
            that = this;

            console.log("sono nella login");
            var email = $("#email").val();
            var passwd = $("#passw").val();

            /*****************************************************
             * Controllo ora tramite chiamata a server (fetch)
             * l'eventuale esistenza, nel caso esista lo mando
             * nella "myview", che corrisponde alla nostra schermata
             * principale altrimenti rimane li ritentando
             * l'autenticazione
             *****************************************************/

            var utente = new UserModel({
                email: email,
            });

            utente.fetch({

                success: function(model, response, options) {

                    var passchiamata = response.customers[0].passwd;
                    var passconfront = md5('7j3EQiXxwscCNaOIORd8YqmvkjfEmDVxs4EcihNJNVNyCG4bHA3ThTnk' + passwd);
                    if (response.length == 0) {
                        $("#errore").text("Email errata");
                    } else {
                        if (passconfront == passchiamata) {
                            $("#errore").empty();
                            $('.menu').animate({
                                "left": "-100%"
                            }, 250);
                            $(".content").css("overflow-y", "auto");
                            localStorage.setItem("sessione", "true");
                            localStorage.setItem("email", email);

                            Backbone.history.navigate("menulog", {
                                trigger: true
                            });
                        } else {
                            $("#errore").text("Password errata");
                        }
                    }
                    //  localStorage.setItem("idsess", (utente.attributes.customers)[0].id);
                    //  localStorage.setItem("keyorder", (utente.attributes.customers)[0].secure_key);


                },
                error: function() {
                    console.log("errore");
                }

            });

        },


        render: function() {
            $(this.el).html(this.template);
            return this;
        },
        /*   cerca: function() {
        $("#he2").removeClass("fa fa-bars icona flex-item2head");   //indietro
        $("#he3").removeClass("flex-item1head");         //div input
        $("#he6").removeClass("flex-item3head icona fa fa-search");  //cerca
        $("#he5").removeClass("flex-item3head icona fa fa-shopping-cart");  //cerca
        $("#menusup").removeClass("flex-containerhead bar bar-nav");
        Backbone.history.navigate("ricercacategoria", {
            trigger: true
        });  
    }
*/

    });

    return MyMenuNoLog;

});