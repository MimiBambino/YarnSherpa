var awesomeShowing = false;

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
  this.showing      = ko.observable();
  this.awesome      = ko.observable();
}

var ViewModel = function() {
  // Saves a reference to ViewModel object
  var self = this;
  // Has the user clicked on the filter buttons?
  self.buttonGroupClicked = ko.observable(false);
  self.init = function() {
    self.fetchFirebase();
  };
  self.firebaseData = {};
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
  // This is the main source of data for the application.
  self.yarnList = [];
  /**
   * Populates the dinoList array and initializes the call to create markers.
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
        if (item.colorways[i].awesome === true) {
          this.awesome  = item.awesome;
        }
        self.yarnList.push( new Yarn(this) );
      }
    });
    console.log(self.yarnList);
    self.displayAwesome(self.yarnList);
  };
  self.displayAwesome = function(yarnList) {
    for (var i = 0; i<yarnList.length; i++) {
      console.log(yarnList.length);
      if (yarnList[i].awesome) {
        var yarn = yarnList[i];
        var str = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div class='card'><div class='card-image'>";
        str += "<img class= 'img-responsive' src='" + yarn.image + "'><div class='card-content'>";
        str += "<p class='text-center'>" + yarn.line;
        str += "</p><p class='text-center'>" + yarn.name + "</p></div></div></div></div>";
        $(".row").append(str);
        awesomeShowing = true;
        }
      }
    };
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