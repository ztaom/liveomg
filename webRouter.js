/**
 * @desc 页面路由设置
 *
 *
 */
const express = require('express');
const router = express.Router();
const site = require('./routes/site');
const share = require('./routes/share');
const download = require('./routes/download');
const shareCommon = require('./routes/shareCommon');
const videoRouter = require('./routes/video');
const { login } = require('./services/index');

function getRouter(app) {

  //console.log('hahahhaahahh');
  //console.log(app);

  // 网站预留
  //router.get('/', site.index);

  router.get('/download/ios', download.ios);

  router.get('/api/loginstatus', login.checkStatus)

  // app动态内容分享路径
  router.get('/share/quizbiz', share.quizbiz);

  //分享common
  router.get('/share/common', shareCommon.common);

  // 新的分享地址
  // router.get('/share/**/*', share.new);

  //video
  //router.get('/*', videoRouter(app));
  router.get('(/xgirls(.html)?)|(/safety(.html)?)|(/cookies(.html)?)|(/gamesignup(.html)?)|(/:countryCode/explore(.html)?)|(/:countryCode/u/:personalId/:index)|(/:countryCode/v/:videoid/:index)|(/:countryCode/m/v/:videoid/:index)|(/:countryCode/:index)|(/:index)|(/)', videoRouter(app));

  return router;
}

module.exports = getRouter;
