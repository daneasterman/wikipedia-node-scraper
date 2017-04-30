var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

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

// app.get('/returned', function (req, res) {
let urls = [];
// let warData = [];

  for(var i = 0; i < wars.length; i++) {
    urls.push("https://en.wikipedia.org/wiki/" + wars[i]);
  }
  Promise.all(urls.map (function (url) {
    return new Promise(function(resolve, reject) {
      request(url, function(err, response, body) {
        if (err) { return reject(err);}
        let $ = cheerio.load(body);
        let title = $('#firstHeading').text();
        let para = $('.infobox').siblings('p').eq(0).text();
        let thumb = $('.infobox').find('img').eq(0).attr('src');
        thumb = "https:" + thumb;
        
        resolve({ title: title, para: para, thumb: thumb});
      });
    });
  })).then(function (result) {
    saveFile(result, "israel-arab-ver2");
  }).catch(function (err) {
    console.log(err);
  });
  
// Saves file in JSON format
function saveFile(data, fileName) {
  outputRoute = __dirname + "/" + fileName + ".json";

  fs.writeFile(outputRoute, JSON.stringify(data, null, 4), function (err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}