define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var StructureView = require("views/StructureView");
    var MyPresentazione = require("views/pages/MyPresentazione");
    var MySelezione = require("views/pages/MySelezione");
    var MyHomepage = require("views/pages/MyHomepage");
    var MyProdotto = require("views/pages/MyProdotto");
    var MyRicercaCategorie = require("views/pages/MyRicercaCategorie");
    var MySearchByName = require("views/pages/MySearchByName");
    var MyRiccat = require("views/pages/MyRiccat");
    var MyAzienda = require("views/pages/MyAzienda");
    var Handlebars = require("handlebars");
    var CategoriesCollection = require("collections/CategoriesCollection");
    var SearchByNameCollection = require("collections/SearchByNameCollection");
    var ProductsCollection = require("collections/ProductsCollection");
    var ProductsSCollection = require("collections/ProductsSCollection");
    var ProductModel = require("models/ProductModel");
    var CategoryModel = require("models/CategoryModel");
    var UtenteModel = require("models/UtenteModel");
    var AziendaModel = require("models/AziendaModel");
    var MyRegistrazione = require("views/pages/MyRegistrazione");
    var MyMenuNoLog = require("views/pages/MyMenuNoLog");
    var MyMenuLog = require("views/pages/MyMenuLog");
    var MyUtente = require("views/pages/Paginapers");
    var MyAcquisto = require("views/pages/Acquisto");
    var MySuccesso = require("views/pages/acSuccesso");
    var CarrelloCollection = require("collections/CarrelloCollection");
    var carrellocollection = new CarrelloCollection();
    var CarrelloModel = require("models/CarrelloModel");
    var Carrello = require("views/pages/MyCarrello");

    var AppRouter = Backbone.Router.extend({

        constructorName: "AppRouter",

        routes: {
            // the default is the structure view
            "": "showStructure",
            "mypresentazione": "Mypresentazione",
            "myselezione": "myselezione",
            "homepage": "homepage",
            "cercacategoria": "cercacategoria",
            "searchname/:id": "searchname",
            "ricercacategoria/:id": "ricercacategoria",
            "prodotto/:id": "prodotto",
            "registrazione": "registrazione",
            "azienda/:id": "azienda",
            "menulog": "menulog",
            "menunolog": "menunolog",
            "acquisto": "MyAcquisto",
            "acSuccesso": "MySuccesso",
            "Carrello": "carrello",
            "personale": "personale"
        },

        firstView: "mypresentazione",
        menulog: function() {
            var menu = new MyMenuLog();
            this.changeSPage(menu);
            $("#menulat").css("overflow-y", "hidden");
            $(".menu").css("left", "0px");
            $("#menusup").removeClass("fixed");
            Backbone.history.navigate("homepage", {
                trigger: true
            });
        },
        menunolog: function() {
            var menu = new MyMenuNoLog();
            this.changeSPage(menu);
            $("#menulat").css("overflow-y", "hidden");
            $(".menu").css("left", "0px");
            $("#menusup").removeClass("fixed");
            Backbone.history.navigate("homepage", {
                trigger: true
            });
        },
        MyAcquisto: function() {
            // create the view
            var page = new MyAcquisto();
            // show the view
            this.changePage(page);
            var tot = totale();
            $('#totale').text(tot);
        },
        personale: function() {
            var page = new MyUtente();
            this.changePage(page);
        },
        MySuccesso: function() {
            var page = new MySuccesso();
            this.changePage(page);
        },
        azienda: function(id) {
            var page = new MyAzienda({
                id: id
            });
            this.changePage(page);
        },
        registrazione: function() {
            var page = new MyRegistrazione();
            this.changePage(page);
        },
        prodotto: function(id) {
            var page = new MyProdotto({
                id: id
            });
            this.changePage(page);
        },
        ricercacategoria: function(id) {
            var page = new MyRiccat({
                id: id
            });
            this.changePage(page);
        },
        searchname: function(id) {
            var page = new MySearchByName({
                id: id
            });
            this.changePage(page);
        },
        cercacategoria: function() {
            var page = new MyRicercaCategorie();
            this.changePage(page);
            var TemplateScript = $("#Ricerca").html();
            var Template = Handlebars.compile(TemplateScript);
            var CompiledHtml = Template();
            $('#content-placeholder').html(CompiledHtml);
        },
        homepage: function() {

            var menu;
            var ctr = localStorage.getItem('sessione');
            if (ctr == "false") {
                menu = new MyMenuNoLog();
                this.changeSPage(menu);
            }
            if (ctr == "true") {
                menu = new MyMenuLog();
                this.changeSPage(menu);
            }
            var page = new MyHomepage();
            this.changePage(page);
        },
        myselezione: function() {
            var page = new MySelezione();
            this.changePage(page);
            selezione();
        },
        initialize: function(options) {
            this.currentView = undefined;
        },
        Mypresentazione: function() {
            // create the view
            var page = new MyPresentazione();
            // show the view
            this.changePage(page);
            var flag = localStorage.getItem("procedere");
            if (flag == 'false') {
                $("#conn").html('<button id="reload" class="buttonload">Connessione assente, clicca per riprovare</button>');
            }
        },
        // load the structure view
        showStructure: function() {
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {
                trigger: true
            });
        },
        carrello: function() {
            var page = new Carrello();
            this.changePage(page);
            var theTemplateScript = $("#address-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            var theCompiledHtml = theTemplate();
            $('.content-placeholder').html(theCompiledHtml);
            var totale = localStorage.totale;
            $('#totale').text(totale);
        },
    });

    return AppRouter;

});