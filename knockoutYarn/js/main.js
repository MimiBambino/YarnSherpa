    $(".row").append(str);
    awesomeShowing = true;

var myDataRef = new Firebase('https://yarnsherpa.firebaseio-demo.com/');
var display = function(){
  try {
    var FB = new Firebase("https://yarnsherpa.firebaseio.com/");
    FB.on('value', function(data) {
    firebaseData = data.val();
    showAwesome(firebaseData);
    sortData(firebaseData);
    });
  } catch(e) {
  // Handle errors with backup copy of data if Firebase is unreachable
    console.log("Nope");
    $.getJSON("../data.json", function(json) {
    console.log("Backup method!");
    console.log(json);
    });
  }
}

var showAwesome = function(data){
  for (var i = 0; i<data.length; i++) {
                var yarns = data[i].colorways;
                for (var j=0; j < yarns.length; j++) {
                  var yarn = yarns[j];
                  if (yarn.awesome) {
                        name = yarns[j].name;
                        var str = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div class='card'><div class='card-image'>";
                        str += "<img class= 'img-responsive' src='" + yarn.image + "'><div class='card-content'>";
                        str += "<p class='text-center'>" + data[i].line;
                        str += "</p><p class='text-center'>" + name + "</p></div></div></div></div>";
                        $(".row").append(str);
                        awesomeShowing = true;
                  }
                }
              }
            }
            var showImages = function(data) {
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i].colorways.length);
                    var yarns = data[i].colorways;
                    for (var j=0; j < yarns.length; j++) {
                        //console.log(yarns[j]);
                        yarn_image = yarns[j].image;
                        name = yarns[j].name;
                        var str = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>";
                        str += "<img class= 'img-responsive img-rounded shadow' src='" + yarn_image + "'>";
                        str += "<p>" + data[i].line;
                        str += "</p>" + name + "</div>";
                        $(".row").append(str);
                    }
                }
            }
            var sortedDict = { "red": { "yarns": [], "display": false },
                               "pink": { "yarns": [], "display": false },
                               "orange": { "yarns": [], "display": false },
                               "yellow": { "yarns": [], "display": false },
                               "green": { "yarns": [], "display": false },
                               "blue": { "yarns": [], "display": false },
                               "purple": { "yarns": [], "display": false },
                               "brown": { "yarns": [], "display": false },
                               "black": { "yarns": [], "display": false },
                               "grey": { "yarns": [], "display": false },
                               "white": { "yarns": [], "display": false },
                               "multi": { "yarns": [], "display": false },
                               "Lace": { "yarns": [], "display": false },
                               "Fingering": { "yarns": [], "display": false },
                               "Sport": { "yarns": [], "display": false },
                               "DK": { "yarns": [], "display": false },
                               "Worsted": { "yarns": [], "display": false },
                               "Bulky": { "yarns": [], "display": false },
                               "Super Bulky": { "yarns": [], "display": false },
                               "Acrylic": { "yarns": [], "display": false },
                               "Alpaca": { "yarns": [], "display": false },
                               "Cashmere": { "yarns": [], "display": false },
                               "Cotton": { "yarns": [], "display": false },
                               "Linen": { "yarns": [], "display": false },
                               "Mohair": { "yarns": [], "display": false },
                               "Silk": { "yarns": [], "display": false },
                               "Wool": { "yarns": [], "display": false },
                               "Nylon": { "yarns": [], "display": false }
            };
            var sortData = function(data) {
              var colors = ["red", "pink", "orange", "yellow", "green", "blue",
                            "purple", "brown", "black", "grey", "white", "multi"];
              var weights = ["Lace", "Fingering", "Sport", "DK", "Worsted",
                            "Bulky", "Super Bulky"];
              var fibers = ["Acrylic", "Alpaca", "Cashmere", "Cotton", "Linen",
                            "Mohair", "Silk", "Wool", "Nylon"];
              for (var i = 0; i < data.length; i++) {
                var yarns = data[i];
                //sortColor(yarns, colors);
                // sort by weight
                sortWeight(yarns, weights);
                // sort by fiber
                //sortFiber(yarns, fibers);
              };
            };
            var sortColor = function(yarns, colors) {};
            var sortWeight = function(yarns, weights) {
              var weight = yarns.weight;
              //console.log("Weight: " + weight);
              for (var i = 0; i < weights.length; i++) {
                //console.log("weights[i]: " + weights[i]);
                if (weight == weights[i]) {
                  if (!sortedDict[weight]["yarns"]) {
                    sortedDict[weight]["yarns"] = [yarns];
                  } else {
                    sortedDict[weight]["yarns"].push(yarns);
                  }
                }
              }
            };
            var sortFiber = function(yarns, fibers) {};
            var filterByWeight = function() {

            }

            var toggleDisplay = function(item){
              if (sortedDict[item]["display"]) {
                sortedDict[item]["display"] = false;
              } else {
                sortedDict[item]["display"] = true;
              }
              update();
            };
            var update = function() {
              if (awesomeShowing) {
                $(".row").empty();
                awesomeShowing = false;
              }
              var features = Object.keys(sortedDict);
              for (var i = 0; i < features.length; i++) {
                console.log(features[i]);
                // if (sortedDict[features[i]]["display"]) {
                //   name = yarns[j].name;
                //   var str = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div class='card'><div class='card-image'>";
                //   str += "<img class= 'img-responsive' src='" + yarn.image + "'><div class='card-content'>";
                //   str += "<p class='text-center'>" + data[i].line;
                //   str += "</p><p class='text-center'>" + name + "</p></div></div></div></div>";
                //   $(".row").append(str);

               // }
              }
            };
            display();

            $('#lace').click(toggleDisplay("Lace"));
            $('#fingering').click(toggleDisplay("Fingering"));
            $('#sport').click(toggleDisplay("Sport"));
            $('#dk').click(toggleDisplay("DK"));
            $('#worsted').click(toggleDisplay("Worsted"));
            $('#bulky').click(toggleDisplay("Bulky"));
            $('#super_bulky').click(toggleDisplay("Super Bulky"));