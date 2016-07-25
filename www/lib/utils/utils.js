//     Utils.js 0.0.1
//     (c) 2013-2014 Ivano Malavolta
//     Utils may be freely distributed under the MIT license.
//     http://www.ivanomalavolta.com
define(function(require) {

    // Initial Setup
    // -------------

    // get references to Backbone and Handlebars libraries
    var Backbone = require("backbone");
    var Handlebars = require("handlebars");
    var CarrelloCollection = require("collections/CarrelloCollection");

    // the object representing the framework
    var Utils = {
        templates: {}
    };
    // array for cache old view
    var viewCache = new Array(2);
    var viewCount = 0;
    var currentPage;
    // This method substitutes Backbone's extend in order to allow developers to 
    // identify Backbone objects in the Chrome profiler
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // BEGIN customized section
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else if (_.has(protoProps, 'constructorName')) {
            eval("child = function " + protoProps.constructorName + "() { return parent.apply(this, arguments); };");
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }
        // END customized section

        _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps) _.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
    };

    Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = Backbone.History.extend = extend;

    // Templates
    // -------------

    // We expect the templates module as a Require object module with the following structure:
    //  - key: the name of the template as it must be referenced by the Backbone view
    //  - value: the path of the html file containing the HTML fragment of the template
    var Templates = require("../js/templates");

    // here we have to put the "text!" prefix to the path of each template
    for (var t in Templates) {
        Templates[t] = "text!" + Templates[t];
    }

    // here we say that Utils is a Backbone object so that it is able to send and receive events
    _.extend(Utils, Backbone.Events);

    // this method is called to load the templates and precompile them
    Utils.loadTemplates = function() {
        require(_.values(Templates), function() {
            var fragments = _.object(_.keys(Templates), arguments);
            // precompile all the fragments
            for (var t in fragments) {
                Utils.templates[t] = Handlebars.compile(fragments[t]);
            }
            // we notify the caller that all the templates have been loaded
            Utils.trigger("templatesLoaded");
        });
        // we return this so that the caller can simply call the once method in chain with the call to the loadTemplates method
        return this;
    };

    // Backbone's View enhancementes
    // -------------

    // function that will be called by the router every time a view must be removed from the DOM 
    Backbone.View.prototype.close = function() {
        // notify the new view that it is being removed
        this.trigger("removing");
        // close also all its subviews
        if (this.subViews) {
            for (var i = 0; i < this.subViews.length; i++) {
                this.subViews[i].close();
            }
        }
        // delete all references to subViews
        this.subViews = null;
        // remove the view from the DOM
        this.remove();
        // remove references to the DOM element of the view (both jQuery and JS objects)
        this.$el = null;
        this.el = null;
    };
    Backbone.Router.prototype.changeSPage = function(page) {
        // close the current view
        // cache the new view
        // this.currentView = page;
        // render the new view
        page.render();
        // put the new view into the DOM
        //    document.getElementById("menulat").empty();
        //$("#menulat").replaceChild(page.el);
        document.getElementById("menulat").replaceChild(page.el, document.getElementById("menulat").childNodes[0]);
        //  $('#menulat').appendChild(page.el);
        // notify the new view that it is now in the DOM
        // this.currentView.trigger("inTheDOM");
    };
    // function that will be called by the router every time a view must be removed from the DOM 
    /*$(document).on('pagecontainerhide', function() {
console.log("mobileinit");
});
  $('mobileinit').load(function() {
  $("#spinner").fadeToggle("slow");
  console.log("content-load");
});  $(pagebeforeload).ready(function() {
  $("#spinner").fadeToggle("slow");
  console.log("content-ready");
}); 
 $(pageload).load(function() {
  $("#spinner").fadeToggle("slow");
  console.log("main-load");
});  $(pagebeforechange).ready(function() {
  $("#spinner").fadeToggle("slow");
  console.log("main-ready");
}); 
$(pagechange).load(function() {
  $("#spinner").fadeToggle("slow");
  console.log("window-load");
});  $(window).ready(function() {
  $("#spinner").fadeToggle("slow");
  console.log("window-ready");
});
 $(document).load(function() {
  $("#spinner").fadeToggle("slow");
  console.log("document-load");
});  $(document).ready(function() {
  $("#spinner").fadeToggle("slow");
  console.log("document-ready");
});
$('.pagina').ready(function() {
  $("#spinner").fadeToggle("slow");
  console.log("cur-ready");
});$(".pagina").load(function() {
  $("#spinner").fadeToggle("slow");
  console.log("cur-load");
});*/
    Backbone.Router.prototype.changePage = function(page, effect, side) {
        //we have not effect selected
        // console.log("effect"+" "+effect);
        //console.log("side"+" "+side);
        if (effect === undefined) {
            // close the current view
            if (this.currentView) {
                //   $(this.currentView).hide("slide", { direction: "left" }, 1000);

                this.currentView.close();

            }
            // cache the new view
            this.currentView = page;
            // render the new view
            page.render();
            // put the new view into the DOM
            this.structureView.contentElement.appendChild(page.el);
            if (this.currentView) {
                // this.currentView.hide();
                //$(this.currentView).show("slide", { direction: "left" }, 1000);

            }

            this.currentView.trigger("inTheDOM");
        }
        // effect fade selected
        if (effect === "fade") {
            //fade out effect
            var content = document.getElementById('content');

            function fadeOut(elem, speed) {
                if (!elem.style.opacity) {
                    elem.style.opacity = 1;
                }
                var outInterval = setInterval(function() {
                    elem.style.opacity -= 0.02;
                    if (elem.style.opacity <= 0) {
                        clearInterval(outInterval);
                        var inInterval = setInterval(function() {
                            elem.style.opacity = Number(elem.style.opacity) + 0.02;
                            if (elem.style.opacity >= 1)
                                clearInterval(inInterval);
                        }, speed / 50);
                    } // end if
                }, speed / 50);
            }
            var that = this;
            if (this.currentView) {
                fadeOut(content, 800);
                setTimeout(function() {
                    that.currentView.close();
                }, 800);
            }
            setTimeout(function() {
                // cache the new view
                that.currentView = page;
                // render the new view
                page.render();
                // put the new view into the DOM
                that.structureView.contentElement.appendChild(page.el);
                // notify the new view that it is now in the DOM
                that.currentView.trigger("inTheDOM");
            }, 800);
        }
        // effect slide selected
        if (effect === "slide") {
            var that = this;
            if (this.currentView) {
                var content = document.getElementById('content');
                if (side === "up") {
                    $(content).addClass('hide-up');
                    // alert("slide up hide");
                }
                if (side === "left") {
                    $(content).addClass('hide-left');
                    // alert("slide left hide");
                }
                setTimeout(function() {
                    that.currentView.close();
                }, 800);
            }
            setTimeout(function() {
                // cache the new view
                that.currentView = page;
                // render the new view
                page.render();
                // put the new view into the DOM
                that.structureView.contentElement.appendChild(page.el);
                // notify the new view that it is now in the DOM
                that.currentView.trigger("inTheDOM");

                if (side === "up") {
                    $(content).addClass('show-up');
                    //alert("slide up show");
                }
                if (side === "left") {
                    $(content).addClass('show-left');
                    // alert("slide left show");
                }
            }, 800);
        }
        if (effect === "flip") {
            if (this.currentView) {
                var content = document.getElementById('content');
                $(content).css("transition", "transform 1s");
                // $(content).removeClass("flipped");
                if (side === "left") {
                    $(content).addClass("flipped-left");
                    this.currentView.close();
                }
                if (side === "top") {
                    $(content).addClass("flipped-top");
                    this.currentView.close();
                }
                if (side === "rotate") {
                    $(content).addClass("flipped-rotate");
                    this.currentView.close();
                }
            }
            // cache the new view
            this.currentView = page;
            // render the new view
            page.render();
            // put the new view into the DOM
            this.structureView.contentElement.appendChild(page.el);
            setTimeout(function() {
                if (side === "left") {
                    $(content).removeClass("flipped-left");
                }
                if (side === "top") {
                    $(content).removeClass("flipped-top");
                }
            }, 600);
            setTimeout(function() {
                if (side === "rotate") {
                    $(content).removeClass("flipped-rotate");
                }
            }, 1000);

            // notify the new view that it is now in the DOM
            this.currentView.trigger("inTheDOM");
        }
    };

    // Pages
    // -------------

    // Pages are special kinds of Backbone's views that take the whole screen of the mobile application
    // the router is in charge of dynamically navigating among pages by means of the changePage method
    Utils.Page = Backbone.View.extend({
        // here we will put all Page-specific code
    });

    // Utility methods
    // -------------

    // shows an arbitrary website in the inner browser
    Utils.showWebsite = function(url) {
        if (navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('It looks like you have no Internet connection, please can you check it?', function() {}, "No Internet");
            return;
        }
        window.open(url, '_blank', 'location=yes,closebuttoncaption=close,EnableViewPortScale=yes');
    };

    // if we have a 404 error when loading an image, we put a transparent pixel in place of the ?? icon
    Utils.imgError = function(source) {
        empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
        source.src = "data:image/png;base64," + empty1x1png;
        source.onerror = "";
        return true;
    };

    // checks if the objects has no properties
    Utils.isObjectEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
    };

    // equivalent to Java's String.startsWith
    String.prototype.startsWith = function(prefix) {
        return this.indexOf(prefix) === 0;
    };

    // equivalent to Java's String.endsWith
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    // removes all XML (so also HTML) tags from the string
    String.prototype.strip = function() {
        return this.replace(/(<([^>]+)>)/ig, "").replace(/(&lt;([^&gt;]+)&gt;)/ig, "");
    };
    //singleton object for Publish and Subscribe events without direct reference 
    Utils.PubSubEvent = (function() {
        var INSTANCE;
        var SingletonObj = function() {
            if (!(this instanceof SingletonObj)) {
                return new SingletonObj();
            }
        };
        _.extend(SingletonObj.prototype, Backbone.Events, {
            test: function(data) {
                console.log(data);
            }
        });
        return {
            init: function() {
                if (!INSTANCE) {
                    INSTANCE = SingletonObj.apply(null, arguments);
                }
                return INSTANCE;
            },
            getInstance: function() {
                return (!INSTANCE) ? this.init.apply(this, arguments) : INSTANCE;
            }
        };
    }());

    // Pages
    // -------------

    // Pages are special kinds of Backbone's views that take the whole screen of the mobile application
    // the router is in charge of dynamically navigating among pages by means of the changePage method
    Utils.Page = Backbone.View.extend({
        // here we will put all Page-specific code
    });
    totale = function() {
        var carrelloObject = JSON.parse(localStorage.getItem('carrellolocal'));
        var carrellocollection = new CarrelloCollection(carrelloObject);

        var tot = 0.00;
        for (var i = 0; i < carrelloObject.length; i++) {
            console.log(carrellocollection);
            tot += Number(carrelloObject[i].price * carrelloObject[i].quantita);
        }
        tot = arrotonda(tot);
        return tot;
    }
    arrotonda = function(valore) {
        return Math.round(valore * Math.pow(10, 2)) / Math.pow(10, 2);
    };

    notag = function(text) {


        var noHTMLTags = text.replace(/(<([^>]+)>)/ig, '');

        return noHTMLTags;




    }
    selezione = function() {
        var scelta = localStorage.getItem('localizzazione');
        console.log(scelta);
        if ((scelta == 'salta') || (scelta = '')) {
            $("#where").html("Scegli la città dove vuoi ricevere l'ordine :");
        } else {
            var scelta = localStorage.getItem('localizzazione');
            console.log(scelta + "dd");
            $("#where").html("Sei stato localizzato presso :");
        }
        $('#' + scelta).attr('selected', true);
    };

    checkConnection = function() {

        var online, speed;
        /*
        condizione di controllo per determinare se l'app viene correntemente testata 
        in un simulatore o dispositivo mobile (quindi utilizzando PhoneGap) o in un normale browser
        che supporta l'HTML5
        */

        if (typeof cordova != "undefined") {
            /*
            si tratta di un dispositivo vero e proprio o di un simulatore, quindi
            utilizziamo il plugin "Connection" messo a disposizione da Phonegap
            */
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown';
            states[Connection.ETHERNET] = 'Ethernet';
            states[Connection.WIFI] = 'WiFi';
            states[Connection.CELL_2G] = 'Cell_2G';
            states[Connection.CELL_3G] = 'Cell_3G';
            states[Connection.CELL_4G] = 'Cell_4G';
            states[Connection.CELL] = 'Cell_generic';
            states[Connection.NONE] = 'None';

            //determino il tipo di connessione in base all'oggetto "states" appena definito grazie al plugin Phonegap
            var connType = states[networkState];

            if (connType == 'None') {
                console.log(connType);

                online = false;
            } else {
                online = true;
                if (connType == "Cell_2g" || connType == "Cell_generic")
                    speed = "slow";
                else
                    speed = "fast";
            }
        }
        return online ? speed : false;
    }

    taglio = function(appoggio) {
        for (var i = 0;
            (appoggio[i]); i++) {
            //Limitazione lunghezza prezzo
            var temp2 = arrotonda(appoggio[i].price);
            appoggio[i].price = temp2 + " €";
            //Limitazione lunghezza nome            
            var temp3 = appoggio[i].name.slice(0, 35);
            if (appoggio[i].name > 35) temp3 = temp3 + "..";
            appoggio[i].name = temp3;
            //Limitazione lunghezza azienda
            if (appoggio[i].manufacturer_name) {
                var temp4 = appoggio[i].manufacturer_name.slice(0, 30);
                if (appoggio[i].manufacturer_name > 30) temp4 = temp4 + "..";
                appoggio[i].manufacturer_name = temp4;
            }
        }
        return appoggio;
    }
    $(document).ready(function() {
        // Calcola la posizione in altezza dell'elemento. Usa outerHeight() se hai del padding https://api.jquery.com/outerHeight/ o offset().top.
        //Altrimenti usa anche height() https://api.jquery.com/height/
        //#nav è il selettore del menù di navigazione
        var navHeight = $('#menusup').outerHeight();
        // Entra quando si scrolla la pagina
        $(window).scroll(function() {
            // Se scorre la pagina oltre il valore salvato in navHeight (quindi la posizione della nav Bar), esegue altre istruzioni
            if ($(window).scrollTop() > navHeight) {
                // Aggiunge la classe .fixed al menù, così da renderlo fisso nella parte superiore dello schermo (impostato tramite style.css)
                $('#menusup').addClass('fixed');
                // aggiungo il padding al contenuto principale, altrimenti l'inizio non si vedrebbe a causa della sovrapposizione della barra di navigazione
                $('#content').css('padding-top', navHeight + 'px');
            } else {
                // se torna sopra il valore di navHeight, rimuove la classe .fixed, e la barra ritorna alla sua posizione originale
                $('#menusup').removeClass('fixed');
                // rimuovo il padding
                $('#content').css('padding-top', '0');
            }
        });
    });

    // the Utils object is public
    return Utils;
});