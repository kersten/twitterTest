var twitter = require('ntwitter'),
    ejs = require('ejs'),
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

var twit = new twitter({
    consumer_key: 'L5e2s3jSFyaqn2HiUhQfqA',
    consumer_secret: 'KUSrY3XBtmOFrIVyIVNMc73nTGM63yKarWo9rang',
    access_token_key: '441900417-KndKIgNVyvPojKrJJ3Q1CPCxrecUWZ7NinBewYTk',
    access_token_secret: 'aEhMmlyObtw9U7WMm0mBzPssAyDMP6LyVP6ID02jE'
});

twit.stream('statuses/filter', {track: 'piraten'}, function(stream) {
    io.sockets.on('connection', function (socket) {
        stream.on('data', function (data) {
            if (data.geo != null) {
                socket.emit('tweet', data);
            }
        });
    });

    stream.on('data', function (data) {
        console.log(data.text);
    });

    stream.on('error', function (data) {
        if (data != null) {
            console.log(arguments);
        }
    });
});

app.use(express.logger());

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.register('.html', ejs);
app.register('.js', ejs);

app.get('/', function (req, res) {
    res.render('map', {
        layout: false
    });
});

app.listen(8080);
console.log('Express server started on port %s', app.address().port);