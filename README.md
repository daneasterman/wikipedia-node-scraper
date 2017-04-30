## Node Wikipedia Scraper

### tl;dr (short summary)

This project includes a node web scraper and a timeline UI "sub-project" to create mobile-friendly vertical historical timelines from Wikipedia articles.

### How does this work?

The code scrapes Wikipedia by programmatically navigating to each link in an array of links and extracting the title, first paragraph and first thumbnail image of the article. 

This generates a neatly formatted JSON file which is saved to the hard disk so that I am not constantly "hitting" the Wikipedia server and placing too much strain on the site's resources.

In this case I have hardcoded links from the topic of my interest - the Arab-Israeli conflict. But in theory this could be applied to any topic or period in history.

These hardcoded links can be found in the wars array (and can be replaced by your own links) here in the `app-promise.js` file:

```
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

```

If I have time, eventually the best practice approach will be to move away from hardcoding, and find relevant timeline links on any given Wikepdia page with a simple loop.

### How do I run this?

**To run the scraper:** once your links are ready, to run the web scraper simply type this in your console / terminal at the root level of the project folder:

`node app-promise.js`

**To run the UI section:** 

To try out the vertical timeline UI with the  the ready-made Israel-Arab conflicts example go to the `vertical-timeline-ui` subfolder within the main `wikipedia-node-scraper` directory. 

You will then probably have to run a local web server due to the security requirements of modern browsers such as Chrome. Even though the JSON file is local, Chrome will block you from accessing it if you just load up the static index.html file.

Instead, the easiest way on a Mac computer is to use the pre-bundled python simple server. So just run this in the root folder of terminal:  
`python -m SimpleHTTPServer 8000`

Then go to `localhost:8000` in your browser.

### What makes this code unique?

The major challenge I encountered was that each time you make a "request" to each link in Wikipedia, the data gets returned asynchronously. 

In other words since different pages take different amounts of time for each request, the order in which the data is returned takes place according to whichever pages finishes "processing" the fastest.

This presents a serious problem for someone trying to create a timeline, as the order of events is obviously very important. We don't want to have to go back into the JSON file and start manually sorting by eye which event goes first. This is especially true if you have loads of events for example.

Short of developing an AI algorithm that understands historical dates and events, the easiest solution I eventually found was using the (relatively) new concept of Javscript Promises.

Essentially the way I understand this, the Promise extracts the data in the normal asynchronous way and then uses the in-built `.map` method to create an array of objects in exactly the same order as the original flat hardcoded array.

It took me some time to get my head around this, but final rather verbose code snippet which I think adds some original value to this project is here:

```
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

```

I tried using some more succint node request libraries but without success. So if anyone has any suggestions to make the code cleaner, simpler and more readable, these ideas are most welcome. Some libraries I tried to use without success have been left in the node_modules folder.

### Credits and references

This project owes a great deal to two other open source code projects generously provided by the authors either on Github or the open web.

For the node scraper itself which gave me the idea to use cheerio (jQuery-like DOM selector library): [https://github.com/ziagrosvenor/Wiki-Scrape ](http://)

For the Vertical Timline UI with CSS3 animation effects, this excellent tutorial and HTML/CSS/JS code snippet: [https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528 
](http://)