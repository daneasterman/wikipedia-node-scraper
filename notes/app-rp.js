var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

// Wars to scrape
var wars = [
"1948_Arab%E2%80%93Israeli_War",
"Suez_Crisis",
"Six-Day_War",
"Yom_Kippur_War",
"Operation_Peace_for_Galilee",
"First_Intifada",
"Second_Intifada",
"2006_Lebanon_War",
"Operation_Cast_Lead",
"Operation_Pillar_of_Defense"
];

for(var i = 0; i < wars.length; i++) {

  var options = {
      uri: "https://en.wikipedia.org/wiki/" + wars[i],
      transform: function (body) {
          return cheerio.load(body);
      }
  };

  rp(options)
      .then(function ($) {
          let title = $('#firstHeading').text();
          let para = $('.infobox').siblings('p').eq(0).text();
          resolve({ title: title, para: para});
      }).then(function(result) {
        

      }
      
      .catch(function (err) {
          console.log(err);
      });


  
} // end for loop






  
    

//     // Saves data as a json file when all battles are scraped
//     if(warData.length === wars.length) {
//       // console.log(warData);
//       saveFile(warData, "sequence-1");
//     }
    
//   });
// }
  
// // Saves file in JSON format
// function saveFile(data, fileName) {
//   outputRoute = __dirname + "/" + fileName + ".json";

//   fs.writeFile(outputRoute, JSON.stringify(data, null, 4), function (err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("The file was saved!");
//     }
//   }); 
// }