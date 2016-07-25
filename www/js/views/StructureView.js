   define(function(require) {

       var $ = require("jquery");
       var Backbone = require("backbone");
       var Utils = require("utils");
       var CategoriesCollection = require("collections/CategoriesCollection");
       var CarrelloCollection = require("collections/CarrelloCollection");
       var carrellocollection = new CarrelloCollection();

       var StructureView = Backbone.View.extend({

           constructorName: "StructureView",

           id: "main",

           events: {
               "tap .fa-shopping-cart": "carrello",
               //APERTURA.oggetti
               //     "tap #content": "prodotto",
               //CHIUSURA.menu
               "tap .closeButton": "close",
               "swipeLeft .menu": "close",
               "swipeLeft .content": "close",
               //APERTURA.menu
               "swipeRight .content": "open",
               "click .fa-bars": "open",
               //BACK.homepage
               //BACK.history
               "tap .btn_procedi": "acquisto",
               "tap .btn_tornahome": "indie",
               "click .fa-chevron-left": "back",

               //RICERCHE
               "click .cercap": "searchbyname", //ricerca tramite nome
               "click .cerca": "cerca", //apertura pagina ricerca
               //pulizia
               "click #sear": "pulizia",


           },
           acquisto: function() {
               console.log("ciao");
               Backbone.history.navigate("acquisto", {
                   trigger: true
               });

           },



           indie: function() {
               Backbone.history.navigate("homepage", {
                   trigger: true
               });
           },
           back: function() {

               window.history.go(-1);
           },
           searchbyname: function() {
               var rice = $("#sear").val();
               var href = "searchname/" + rice;
               location.hash = href;
           },
           carrello: function() {
               Backbone.history.navigate("Carrello", {
                   trigger: true
               });

           },
           acquisto: function() {
               console.log("ciao");
               Backbone.history.navigate("acquisto", {
                   trigger: true
               });

           },
           open: function() {
               $("#menusup").removeClass("fixed");
               $('.menu').animate({
                   "left": "0%"
               }, 250);
               $(".content").css("overflow-y", "hidden");
           },
           cerca: function() {
               Backbone.history.navigate("cercacategoria", {
                   trigger: true
               });
           },
           close: function() {
               $("#menusup").addClass("fixed");
               $('.menu').animate({
                   "left": "-100%"
               }, 250);
               $(".content").css("overflow-y", "auto");
           },
           pulizia: function() {
               $(".nuovo").one("click", function() {
                   $("#sear").removeClass("nuovo");
                   $("#sear").val('');
               });
           },


           cercacategoria: function() {
               console.log("view");
               Backbone.history.navigate("cercacategoria", {
                   trigger: true
               });
           },

           initialize: function(options) {
               // load the precompiled template
               this.template = Utils.templates.structure;
           },

           render: function() {
               //Inizializzazione sessione
               localStorage.setItem('procedere', 'true');
               localStorage.setItem('sessione', 'false');
               localStorage.setItem('identificativo_carrello', 1);
               localStorage.setItem('carrellolocal', JSON.stringify(carrellocollection));
               var categoriesCollection = new CategoriesCollection();
               categoriesCollection.fetch({
                   success: function(collection, response, options) {
                       var coll = JSON.stringify(collection);
                       localStorage.setItem('categorie', coll);
                   },
                   error: function(collection, response, options) {
                       localStorage.setItem('procedere', 'false');
                       console.log('Errore chiamata ajax!');
                   }
               });


               //Geolocalizzazione
               var latitudine, longitudine;
               //GPS
               var maxAge = 3000,
                   timeout = 5000;
               var onSuccess = function(position) {
                   var urlmio = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
                   urlmio += position.coords.latitude + ',';
                   urlmio += position.coords.longitude + '&sensor=true';
                   console.log(urlmio);

                   var chiamataAjax = function() {
                       $.ajax({
                           url: urlmio,
                           async: true,
                           type: "GET",
                           success: function(result) {
                               var posizione = (result.results[0]).address_components[2].long_name;
                               console.log(posizione);
                               posizione2 = posizione.toLowerCase()
                               posizione3 = posizione2.replace(' ', '');
                               posizione4 = posizione3.replace("''", '');
                               switch (posizione4) {
                                   case 'castelfrentano':
                                       localStorage.setItem('localizzazione', 'castelfrentano');
                                       break;
                                   case 'fossacesia':
                                       localStorage.setItem('localizzazione', 'fossacesia');
                                       break;
                                   case 'lanciano':
                                       localStorage.setItem('localizzazione', 'lanciano');
                                       break;
                                   case 'frisa':
                                       localStorage.setItem('localizzazione', 'frisa');
                                       break;
                                   case 'coppito':
                                       localStorage.setItem('localizzazione', 'coppito');
                                       break;
                                   case 'ortona':
                                       localStorage.setItem('localizzazione', 'ortona');
                                       break;
                                   case 'roccasangiovanni':
                                       localStorage.setItem('localizzazione', 'roccasangiovanni');
                                       break;
                                   case 'santamariaimbaro':
                                       localStorage.setItem('localizzazione', 'santamariaimbaro');
                                       break;
                                   case 'sanvitochietino':
                                       localStorage.setItem('localizzazione', 'sanvitochietino');
                                       break;
                                   case 'treglio':
                                       localStorage.setItem('localizzazione', 'treglio');
                                       break;
                                   default:
                                       localStorage.setItem('localizzazione', 'salta');
                                       break;
                               }
                           },
                           error: function(XMLHttpRequest, textStatus, errorThrown) {
                               localStorage.setItem('localizzazione', 'salta');
                               console.log('Errore GPS!');
                           }
                       })
                   };
                   chiamataAjax();
               };

               function onError(error) {

               };

               navigator.geolocation.getCurrentPosition(onSuccess, function(error) {
                   console.log("Failed to retrieve high accuracy position - trying to retrieve low accuracy");
                   navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                       maximumAge: maxAge,
                       timeout: timeout,
                       enableHighAccuracy: false
                   });
               }, {
                   maximumAge: maxAge,
                   timeout: timeout,
                   enableHighAccuracy: true
               });



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

               // load the template
               // this.el.innerHTML = this.template(JSON.parse(localStorage["Carrello"]));
               this.el.innerHTML = this.template({});

               // cache a reference to the content element
               this.contentElement = this.$el.find('#content')[0];
               return this;

           },



       });

       return StructureView;

   });