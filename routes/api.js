var express = require('express');
var mysql = require('mysql');
var git = require('git-rev');

var stream = require('stream');
var stringify = require('csv-stringify');
var archiver = require('archiver');

var router = express.Router();

var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

var gitHash = '';

git.long(function (str) {
    gitHash = str;
});

var headers = [
    ["gameinfoid", "Game Id"],
    ["timestamp", "Game Start Time"],
    ["githash", "App Version"],
    ["experimentname", "ExperimentName"],
    ["feedbackoption", "Feedback Option"],
    ["trackingtoken", "Tracking Token"],
    ["hasclickedplayagain", "Has Clicked Play Again"],
    ["hasplayedbefore", "Has Played Before"],
    ["age", "Age"],
    ["gender", "Gender"],
    ["country", "Country"],
    ["istouchscreen", "Is Touch Screen"],
    ["nickname", "Nick Name"],
    ["isplayingoften", "Is Playing Often"],
    ["isgoodatgames", "Is Good at Games"],
    ["score", "Score"],
    ["sequence", "Event Sequence Number"],
    ["data", "Extra Data"],
    ["eventtype", "Event Type"],
    ["time", "Game Event Time", function (value) {
        try {
            return new Date(value).toISOString();
        } catch(e) {}
        return value;
    }],
    ["gametimer", "Game Timer"],
    ["urlslug", "Url Slug"],
    ["ip", "IP Address"]
];

var defaultMappingFunction = function(x) { return x; };

/* GET results */
router.get('/result', function (req, res, next) {
    var query = pool.query('SELECT * ' +
        'FROM game_info ' +
        'JOIN game_event ON(game_info.id = game_event.gameinfoid) ' +
        'ORDER BY game_info.id, game_event.sequence');

    var stringifier = stringify();

    res.attachment('results.zip');
    res.contentType('text/csv');

    var firstLine = true;
    var transform = new stream.Transform({objectMode: true});
    transform._transform = function (chunk, encoding, callback) {
        if(firstLine) {
            firstLine = false;
            transform.push(headers.map(function (item) {
                return item[1];
            }));
        }

        transform.push(headers.map(function (item) {
            var mappingFunction = item[2] || defaultMappingFunction;
            return mappingFunction(chunk[item[0]]);
        }));

        callback();
    };

    var zip = archiver.create('zip');
    zip.pipe(res);

    zip.append(
        query
            .stream()
            .pipe(transform).pipe(stringifier),
        {name: 'results.csv'}
    ).finalize();
});

router.post('/game/info', function (req, res) {

    var data = req.body;

    pool.query('INSERT INTO game_info SET ?', {
        timestamp: data.TimeStamp,
        experimentname: data.ExperimentName,
        feedbackoption: JSON.stringify(data.FeedbackOption),
        trackingtoken: data.TrackingToken,
        hasclickedplayagain: data.HasClickedPlayAgain,
        hasplayedbefore: data.HasPlayedBefore,
        age: data.Age,
        gender: data.Gender,
        country: data.Country,
        istouchscreen: data.IsTouchScreen,
        nickname: data.NickName,
        isplayingoften: data.IsPlayingOften,
        isgoodatgames: data.IsGoodAtGames,
        score: data.score,
        urlslug: data.UrlSlug,
        githash: gitHash,
        ip: req.ip
    }, function (err, result) {
        console.log(result);

        if(!err) {
            res.json({gameId: result.insertId});
        } else {
            res.status(500);
            res.json(err);
        }
    });
});

router.post('/game/:id/event', function (req, res) {

    var data = req.body;

    pool.query('INSERT INTO game_event SET ?', {
        gameinfoid: req.params.id,
        sequence: data.Sequence,
        data: JSON.stringify(data.Data),
        eventtype: data.EventType,
        score: data.Score,
        time: Date.now(),
        gametimer: data.GameTimer
    }, function (err, result) {

        if(!err) {
            res.end();
        } else {
            res.status(500);
            res.json(err);
        }
    });
});

module.exports = router;