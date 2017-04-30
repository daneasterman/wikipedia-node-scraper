var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// Battles to scrape
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

var warData = [];

for(var i = 0; i < wars.length; i++) {
	request({
		uri: "https://en.wikipedia.org/wiki/" + wars[i]
	}, function (err, response, body) {
		// Initialize cheerio
		var $ = cheerio.load(body);

		var title = $('#firstHeading').text();
		// Doesn't work for Six Day War
		var para = $('.infobox').siblings('p').eq(0).text();		
		
		var thumb = $('.infobox').find('img').eq(0).attr('src');
		thumb = "https:" + thumb;

		var imgArray = thumb.split("/");
		imgArray.splice(5, 1); // Gets rid of thumb subdir
		imgArray.pop(); // Gets rid of extra jpg suffix

		var newImg = "";
		for (i = 3; i < imgArray.length; i++) {
		newImg += "/";
		newImg += imgArray[i];
		}
		var mainImg = "https://upload.wikimedia.org/" + newImg;

		var war = {
			"title": title,
			"para": para,
			"thumb": thumb,
			"mainImg": mainImg
		};
		warData.push(war);

		// Saves data as a json file when all battles are scraped
		if(warData.length === wars.length) {
			// console.log(warData);
			saveFile(warData, "sequence-1");
		}
		
	});
}
	
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