app.get('/returned', function (req, res) {
    let urls = [];
    for (let y = 0; y < 10; y++) {
        urls.push('http://example.com' + y + '/person.html');
    }
    Promise.all(urls.map(function (url) {
        return new Promise(resolve, reject) {
            request(url, function (err, resp, body) {
                if (err) {return reject(err);}
                let $ = cheerio.load(body);
                let links = $('#container');
                let name = links.find('span[itemprop="name"]').html(); // name
                resolve(
                    {name: name, links: links, url: url});
            });
        });
    }).then(function (result) {
        result.forEach(function (obj) {
            if (obj.name == null) {
                console.log(obj.url, "returned null");
            } else {
                console.log(obj.url, obj.name);
            }
        });
    }).catch(function (err) {
        console.log(err);
    });
});