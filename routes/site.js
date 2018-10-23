var express = require('express');
var router = express.Router();

var site = {
    index: function (req, res, next) {
        //        res.render('index', { title: 'test' });
        var title = 'm.liveme.com';
        var shareImg = 'http://www.liveme.com/images/logo.jpg';
        var description = 'm.liveme.com';
        res.render('index', {
            title: title,
            shareImg: shareImg,
            description: description
        });
    }
};

module.exports = site;
