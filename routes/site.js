var express = require('express');
var router = express.Router();

var site = {
    index: function (req, res, next) {
        //        res.render('index', { title: 'test' });
        var title = 'm.liveomg.com';
        var shareImg = 'http://www.liveomg.com/images/logo.jpg';
        var description = 'm.liveomg.com';
        res.render('index', {
            title: title,
            shareImg: shareImg,
            description: description
        });
    }
};

module.exports = site;
