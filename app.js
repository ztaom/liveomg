const express = require('express');
const ejs = require('ejs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const rimraf = require('rimraf');
const fs = require('fs');
const microcache = require('route-cache');
const resolve = file => path.resolve(__dirname, file);
const getConfig = require('./dev.config.js');
// const Window = require('window');
// const window = new Window();

global.G_IsDevelopment = process.env.NODE_ENV == 'production' ? 0 : 1; // 当前环境

const isProd = process.env.NODE_ENV === 'production';

//var index = require('./routes/index');
//var users = require('./routes/users');

const app = express();

const webRouter = require('./webRouter')(app);
const useMicroCache = process.env.MICRO_CACHE !== 'false'

if(fs.existsSync(path.resolve(__dirname, `./staticHtml`))) rimraf(path.resolve(__dirname, `./staticHtml`),(e) => {
  console.log(e)
});

app.use(compression());

// app.set('env', 'production');
//console.log(process.env.NODE_ENV)

app.use(function (req, res, next) {
    console.log('环境', process.env.NODE_ENV);
    console.log('环境', req.app.get('env'))
    next();
});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// view html engine

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

app.use(favicon('./src/assets/favicon.ico'));
app.use('/dist', serve('./dist', true));
app.use('/', serve('./staticHtml', true));
app.use('/assets', serve('./src/assets', true));
//app.use('/service-worker.js', serve('./dist/service-worker.js'));
app.use('/download', serve('./views/download', true));

app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use(function(req, res, next){
  //baseUrl imcKey NODE_ENV APP_VR
  process.browser = false;
  const devConfig = getConfig(req.query.host == 'test');
  process = {...process, ...devConfig};
  next();
});

app.use('/', webRouter);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
