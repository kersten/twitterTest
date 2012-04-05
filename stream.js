var twitter = require('ntwitter');

var twit = new twitter({
    consumer_key: 'L5e2s3jSFyaqn2HiUhQfqA',
    consumer_secret: 'KUSrY3XBtmOFrIVyIVNMc73nTGM63yKarWo9rang',
    access_token_key: '441900417-KndKIgNVyvPojKrJJ3Q1CPCxrecUWZ7NinBewYTk',
    access_token_secret: 'aEhMmlyObtw9U7WMm0mBzPssAyDMP6LyVP6ID02jE'
});

twit.stream('statuses/sample', function(stream) {
    stream.on('data', function (data) {
        if (data.coordinates != null) console.log(data.geo);
    });
});
