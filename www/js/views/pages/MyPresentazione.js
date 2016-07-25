define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var MyPresentazione = Utils.Page.extend({

        constructorName: "MyPresentazione",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.presentazione;
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "mypresentazione",
        className: "pagina",

        events: {
            "tap #presentazione": "avanti",
            "tap #conn": "reload",
        },
        reload: function() {
            console.log("vadovado")
            var deviceConnection = checkConnection();
            console.log(deviceConnection);
            if (deviceConnection) {
                if (deviceConnection == "slow") {
                    //gestione connnessione lenta
                    localStorage.setItem('procedere', 'true');
                } else {
                    //gestione connnessione veloce
                    localStorage.setItem('procedere', 'true');

                }
            } else {
                localStorage.setItem('procedere', 'false');

                /*
                gestione transizioni ed effetti per mostrare all'utente 
                un gradevole avviso di mancanza di connessione  
                */
            }
            Backbone.history.navigate("", {
                trigger: true
            });
        },
        render: function() {
            $(this.el).html(this.template());

            return this;
        },

        avanti: function(e) {
            var flag = localStorage.getItem("procedere");
            if (flag == 'true') {
                Backbone.history.navigate("myselezione", {
                    trigger: true
                });
            }
        }
    });

    return MyPresentazione;

});