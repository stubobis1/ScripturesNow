var http = require('http'),
    https = require('https'),
    request = require('request'),
    cheerio = require('cheerio');

var scripScrap = function(data, res) {
    var json = {},
        buildSearchURL = function(data) {
            var testament = data.testaments.reduce(function(previousValue, currentValue) {
                    return previousValue + '&testament=' + currentValue;
                }, ''),
                query = '&query=' + data.terms.reduce(function(previousValue, currentValue) {
                    return previousValue + '+' + currentValue;
                });

            return 'https://www.lds.org/scriptures/search?lang=eng&start=1&end=30&type=verse' + testament + query;
        },

        scrapeVerse = function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);

                var scripture = $('p').text();

                console.log(json);

                json.verse = scripture;
            }

            res.send(JSON.stringify(json, null, 4));
        };

    console.log(buildSearchURL(data));

    request(buildSearchURL(data), function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html),
                result,
                uri,
                verse,
                length;

            result = $('.results-list h3 a');
            length = $(result).length;
            if (length) {
                verse = $(result).get(Math.floor(Math.random() * $(result).length));
                json.ref = $(verse).text();

                uri = ($(verse).attr('href')  || '').match(/\/s.*(?=\?)/)[0];

                request('https://www.lds.org/scriptures/footnote/detail?lang=eng&isReference=true&noteUri='+uri, scrapeVerse);
            } else {
                res.send(JSON.stringify({err: 'no results'}, null, 4));
            }
        }

    });
};

module.exports = scripScrap;
