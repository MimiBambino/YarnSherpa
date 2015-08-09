var View = {
  // Create an image card for a yarn
  // Pass this function in the form:
  //    {
  //        "manufacturer": "Knit Picks",
  //        "line": "Chroma Worsted Yarn",
  //        "weight": "Worsted",
  //        "fiber": "70% Wool, 30% Nylon",
  //        "link": "http://www.knitpicks.com/yarns/Chroma_Worsted_Yarn__D5420204.html",
  //        "name": "New Leaf",
  //        "image": "http://d2q9kw5vp0we94.cloudfront.net/regular/26470.jpg",
  //        "color": "multi"
  //        "showing": false
  //    }
  createContent: function(yarn) {
    var str = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div class='card'><div class='card-image'>";
    str += "<img class= 'img-responsive' src='" +
            yarn.image + "'><div class='card-content'>";
    str += "<p class='text-center'>" + yarn.line;
    str += "</p><p class='text-center'>" + yarn.name + "</p></div></div></div></div>";
    return str;
    }
};

/**
 * Prototype for all application data
 */

var Yarn = function(data) {
  this.manufacturer = data.manufacturer;
  this.line         = data.line;
  this.weight       = data.weight;
  this.fiber        = data.fiber;
  this.link         = data.link;
  this.name         = data.name;
  this.image        = data.image;
  this.color        = data.color;
}

var ViewModel = function() {
  // Saves a reference to ViewModel object
  var self = this;
  self.firebaseData = {};

    // This is the main source of data for the application.
  self.yarnList = [];

  // Yarns to be shown by UI
  self.displayList = ko.observableArray();
  self.colorList = ["red", "pink", "orange", "yellow", "green", "blue",
                    "purple", "brown", "black", "grey", "white", "multi"];
  self.weightList = ["Lace", "Fingering", "Sport", "DK", "Worsted",
                     "Bulky", "Super Bulky"];
  self.fiberList = ["Acrylic", "Alpaca", "Cashmere", "Cotton", "Linen",
                    "Mohair", "Silk", "Wool", "Nylon"];

    /**
  * Keep track of yarn cards by type.
  */
  self.redYarns = [];
  self.pinkYarns = [];
  self.orangeYarns = [];
  self.yellowYarns = [];
  self.greenYarns = [];
  self.blueYarns = [];
  self.purpleYarns = [];
  self.brownYarns = [];
  self.blackYarns = [];
  self.greyYarns = [];
  self.whiteYarns = [];
  self.multiYarns = [];
  self.laceYarns = [];
  self.fingeringYarns = [];
  self.sportYarns = [];
  self.dkYarns = [];
  self.worstedYarns = [];
  self.bulkyYarns = [];
  self.superBulkyYarns = [];

  // self.displayRed        = ko.observableArray();
  // self.displayPink       = ko.observableArray();
  // self.displayOrange     = ko.observableArray();
  // self.displayYellow     = ko.observableArray();
  // self.displayGreen      = ko.observableArray();
  // self.displayBlue       = ko.observableArray();
  // self.displayPurple     = ko.observableArray();
  // self.displayBrown      = ko.observableArray();
  // self.displayBlack      = ko.observableArray();
  // self.displayGrey       = ko.observableArray();
  // self.displayWhite      = ko.observableArray();
  // self.displayMulti      = ko.observableArray();
  // self.displayLace       = ko.observableArray();
  // self.displayFingering  = ko.observableArray();
  // self.displaySport      = ko.observableArray();
  // self.displayDk         = ko.observableArray();
  // self.displayWorsted    = ko.observableArray();
  // self.displayBulky      = ko.observableArray();
  // self.displaySuperBulky = ko.observableArray();
  // self.displayAcrylic    = ko.observableArray();
  // self.displayAlpaca     = ko.observableArray();
  // self.displayCashmere   = ko.observableArray();
  // self.displayCotton     = ko.observableArray();
  // self.displayLinen      = ko.observableArray();
  // self.displayMohair     = ko.observableArray();
  // self.displaySilk       = ko.observableArray();
  // self.displayWool       = ko.observableArray();
  // self.displayNylon      = ko.observableArray();

  self.init = function() {
    self.fetchFirebase();
  };
  /**
   * Retrieves data from Firebase and initializes call to create the dinoList
   */
  self.fetchFirebase = function(){
    try {
      var FB = new Firebase("https://yarnsherpa.firebaseio.com/");
      FB.on('value', function(data) {
        self.firebaseData = data.val();
        self.setYarnList(self.firebaseData);
        });
    } catch(e) {
        // Handle errors with backup copy of data if Firebase is unreachable
      self.setYarnList(yarnData);
    }
  }

  /**
   * Populates the yarnList array and initializes the call to create yarn cards.
   */
  self.setYarnList = function(data) {
    data.forEach(function(item) {
      this.manufacturer = item.manufacturer;
      this.line         = item.line;
      this.weight       = item.weight;
      this.fiber        = item.fiber;
      this.link         = item.link;

      for (var i = 0; i < item.colorways.length; i++) {
        this.name       = item.colorways[i].name;
        this.image      = item.colorways[i].image;
        this.color      = item.colorways[i].color;
        }
        self.yarnList.push( new Yarn(this) );
      });
    self.createCards();
  };

  self.createCards = function() {
    var yarnList = self.yarnList;
    for (var i = 0; i < yarnList.length; i++) {
        var yarn = yarnList[i];
        var card = View.createContent(yarn);
        if (yarn.color === "red") {
            self.redYarns.push(card);
        }
        if (yarn.color === "pink") {
            self.pinkYarns.push(card);
        }
        if (yarn.color === "orange") {
            self.orangeYarns.push(card);
        }
        if (yarn.color === "yellow") {
            self.yellowYarns.push(card);
        }
        if (yarn.color === "green") {
            self.greenYarns.push(card);
        }
        if (yarn.color === "blue") {
            self.blueYarns.push(card);
        }
        if (yarn.color === "purple") {
            self.purpleYarns.push(card);
        }
        if (yarn.color === "brown") {
            self.brownYarns.push(card);
        }
        if (yarn.color === "black") {
            self.blackYarns.push(card);
        }
        if (yarn.color === "grey") {
            self.greyYarns.push(card);
        }
        if (yarn.color === "white") {
            self.whiteYarns.push(card);
        }
        if (yarn.color === "multi") {
            self.multiYarns.push(card);
        }
        if (yarn.weight === "Lace") {
            self.laceYarns.push(card);
        }
        if (yarn.weight === "Fingering") {
            self.fingeringYarns.push(card);
        }
        if (yarn.weight === "Sport") {
            self.sportYarns.push(card);
        }
        if (yarn.weight === "DK") {
            self.dkYarns.push(card);
        }
        if (yarn.weight === "Worsted") {
            self.worstedYarns.push(card);
        }
        if (yarn.weight === "Bulky") {
            self.bulkyYarns.push(card);
        }
        if (yarn.weight === "Super Bulky") {
            self.superBulkyYarns.push(card);
        }
        // if (yarn.fiber === "") {
        //     self.yellowYarns.push(card);
        // }
        // if (yarn.fiber === "") {
        //     self.redYarns.push(card);
        // }
        // if (yarn.fiber === "") {
        //     self.pinkYarns.push(card);
        // }
        // if (yarn.fiber === "") {
        //     self.orangeYarns.push(card);
        // }
        // if (yarn.fiber === "") {
        //     self.yellowYarns.push(card);
        // }
    }
  };

  /**
   * Called from Knockout binding on the filter buttons.  Determines
   * which yarns to display and calls the display function.
   */
  self.toggleYarns = function() {
    switch (arguments[0]) {
        case "red":
          for (var i = 0; i < self.redYarns.length; i++) {
            self.displayList().push(self.redYarns[i]);
          }
          break;
        case "pink":
          for (var i = 0; i < self.pinkYarns.length; i++) {
            self.displayList().push(self.pinkYarns[i]);
          }
          break;
        case "orange":
          for (var i = 0; i < self.orangeYarns.length; i++) {
            self.displayList().push(self.orangeYarns)[i];
          }
          break;
        case "yellow":
          for (var i = 0; i < self.yellowYarns.length; i++) {
            self.displayList().push(self.yellowYarns[i]);
          }
          break;
        case "green":
          for (var i = 0; i < self.greenYarns.length; i++) {
            self.displayList().push(self.greenYarns[i]);
          }
          break;
        case "blue":
          for (var i = 0; i < self.blueYarns.length; i++) {
            self.displayList().push(self.blueYarns[i]);
          }
          break;
        case "purple":
          for (var i = 0; i < self.purpleYarns.length; i++) {
            self.displayList().push(self.purpleYarns[i]);
          }
          break;
        case "brown":
          self.displayList().push(self.brownYarns);
          break;
        case "black":
          self.displayList().push(self.blackYarns);
          break;
        case "grey":
          self.displayList().push(self.greyYarns);
          break;
        case "white":
          self.displayList().push(self.whiteYarns);
          break;
        case "multi":
          self.displayList().push(self.multiYarns);
          break;
        case "lace":
          self.displayList().push(self.laceYarns);
          break;
        case "fingering":
          self.displayList().push(self.fingeringYarns);
          break;
        case "sport":
          self.displayList().push(self.sportYarns);
          break;
        case "dk":
          self.displayList().push(self.dkYarns);
          break;
        case "worsted":
          self.displayList().push(self.worstedYarns);
          break;
        case "bulky":
          self.displayList().push(self.bulkyYarns);
          break;
        case "superBulky":
          self.displayList().push(self.superBulkyYarns);
          break;
        case "acrylic":
          self.displayList().push(self.acrylicYarns);
          break;
        case "alpaca":
          self.displayList().push(self.alpacaYarns);
          break;
        case "cashmere":
          self.displayList().push(self.cashmereYarns);
          break;
        case "cotton":
          self.displayList().push(self.cottonYarns);
          break;
        case "linen":
          self.displayList().push(self.linenYarns);
          break;
        case "mohair":
          self.displayList().push(self.mohairYarns);
          break;
        case "silk":
          self.displayList().push(self.silkYarns);
          break;
        case "wool":
          self.displayList().push(self.woolYarns);
          break;
        case "nylon":
          self.displayList().push(self.nylonYarns);
          break;
    }
  };

  // self.toggleYarns = function() {
  //   switch (arguments[0]) {
  //       case "red":
  //         self.displayRed().push(self.redYarns);
  //         break;
  //       case "pink":
  //         self.displayPink().push(self.pinkYarns);
  //         break;
  //       case "orange":
  //         self.displayOrange().push(self.orangeYarns);
  //         break;
  //       case "yellow":
  //         self.displayYellow().push(self.yellowYarns);
  //         break;
  //       case "green":
  //         self.displayGreen().push(self.greenYarns);
  //         break;
  //       case "blue":
  //         self.displayBlue().push(self.blueYarns);
  //         break;
  //       case "purple":
  //         self.displayPurple().push(self.purpleYarns);
  //         break;
  //       case "brown":
  //         self.displayBrown().push(self.brownYarns);
  //         break;
  //       case "black":
  //         self.displayBlack().push(self.blackYarns);
  //         break;
  //       case "grey":
  //         self.displayGrey().push(self.greyYarns);
  //         break;
  //       case "white":
  //         self.displayWhite().push(self.whiteYarns);
  //         break;
  //       case "multi":
  //         self.displayMulti().push(self.multiYarns);
  //         break;
  //       case "lace":
  //         self.displayLace().push(self.laceYarns);
  //         break;
  //       case "fingering":
  //         self.displayFingering().push(self.fingeringYarns);
  //         break;
  //       case "sport":
  //         self.displaySport().push(self.sportYarns);
  //         break;
  //       case "dk":
  //         self.displayDk().push(self.dkYarns);
  //         break;
  //       case "worsted":
  //         self.displayWorsted().push(self.worstedYarns);
  //         break;
  //       case "bulky":
  //         self.displayBulky().push(self.bulkyYarns);
  //         break;
  //       case "superBulky":
  //         self.displaySuperBulky().push(self.superBulkyYarns);
  //         break;
  //       case "acrylic":
  //         self.displayAcrylic().push(self.acrylicYarns);
  //         break;
  //       case "alpaca":
  //         self.displayAlpaca().push(self.alpacaYarns);
  //         break;
  //       case "cashmere":
  //         self.displayCashmere().push(self.cashmereYarns);
  //         break;
  //       case "cotton":
  //         self.displayCotton().push(self.cottonYarns);
  //         break;
  //       case "linen":
  //         self.displayLinen().push(self.linenYarns);
  //         break;
  //       case "mohair":
  //         self.displayMohair().push(self.mohairYarns);
  //         break;
  //       case "silk":
  //         self.displaySilk().push(self.silkYarns);
  //         break;
  //       case "wool":
  //         self.displayWool().push(self.woolYarns);
  //         break;
  //       case "nylon":
  //         self.displayNylon().push(self.nylonYarns);
  //         break;
  //   }
  // };

  /**
   * Displays or hides groups of yarns.
   */
    self.display = function(cards) {
        // if more than one of the cards is hidden, display all of the
        // cards of that type
        if (cards[0].visible === false || cards[2].visible === false) {
            for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            $('.row').append(card);
            }
        // if more that one of the cards is visible, call the hide function
        } else if (cards[0].visible === true || cards[2].visible === true) {
            self.hide(cards);
        }
    };

    // Hides all of the passed in cards
    self.hide = function(cards) {
        for (var i = 0; i < cards.length; i++){
            var card = cards[i];
            $('.row').remove(card);
        }
    };

    self.displayList = ko.observableArray();

  self.init();
};
  // self.init();
// };

/**
 * Custom binding for fade in effect
 */
// ko.bindingHandlers.fadeVisible = {
//     init: function(element, valueAccessor) {
//         // Initially set the element to be instantly visible/hidden depending on the value
//         var value = valueAccessor();
//         $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
//     },
//     update: function(element, valueAccessor) {
//         // Whenever the value subsequently changes, slowly fade the element in or out
//         var value = valueAccessor();
//         ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
//     }
// };

ko.applyBindings( new ViewModel() );