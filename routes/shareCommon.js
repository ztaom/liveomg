/**
 * @desc 动态内容分享功能
 *
 **/
const express = require('express');
const router = express.Router();

const axios = require('axios');
const _ = require('lodash');
console.log('执行地址: ', process.cwd())
const Config_liveomg = require(`${process.cwd()}/config/config`).liveomg;
const utils = require(`${process.cwd()}/utils/util`);




console.log('当前环境', G_IsDevelopment);
var share = {

    /*
    * desc: 答题分享 从服务端获取信息后渲染
    * url: http://localhost:3000/share/common?type=2
    * wiki: https://twiki.cmcm.com/pages/viewpage.action?pageId=29984504#id-%E5%A4%A7%E8%BD%AC%E7%9B%98-%E7%AC%AC%E4%B8%80%E6%9C%9F-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-6)%E9%80%9A%E7%94%A8%E5%88%86%E4%BA%AB
    * */
    common: function (req, res, next) {

        const conTime = Date.now();

        let paramsData = req.query || {};

        console.log(req.get('host'));

        let paramsStr = '';

        for (let k in paramsData) {

            // if (k == 'uid' || k == 'countryCode' || k == 'vid' || k == 'type' || k == 'short_id') {
            // if (k == 'type' || k == 'short_id') {
            //     continue;
            // }
            paramsStr += `&${k}=${paramsData[k]}`;
        }
        console.log('paramsStr', paramsStr);

        // let dataRes = {
        //     title: Config_liveomg.quizbizTitle,
        //     description: Config_liveomg.quizbizDescription,
        //     shareImg: Config_liveomg.quizbizImg,
        //     shareTo: Config_liveomg.shareTo,
        //     currentUrl: req.protocol + '://' + req.get('host') + req.url
        // };

        // 性能比
        console.log('ajax消耗时间', Date.now() - conTime);

        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
        axios.defaults.baseURL = utils.liveomgApiHost(req);

        let apiUrl = utils.liveomgApiHost(req) + '/share/info';

        console.log('请求的api地址: ', apiUrl);

        let apiPara = {
            type: paramsData.type,
            area: paramsData.area || 'A_US',
        };
        axios.get(apiUrl, {

            params: apiPara
        }
        ).then(function (response) {

            console.log('then ajax消耗时间1', Date.now() - conTime);

            let dataGet = {};

            if(response && typeof response == 'string'){
                response = JSON.parse(response)
            };

            if (response.status == 200 && response.data.status == 200) {

                dataGet = {
                    title: _.get(response, 'data.data.title'),
                    description: _.get(response, 'data.data.desc') || _.get(response, 'data.data.title'),
                    shareTo: _.get(response, 'data.data.h5_url'),
                    ardink: _.get(response, 'data.data.url_android'),
                    ioslink: _.get(response, 'data.data.url_ios')
                };

                if(paramsData.picType == 'rectangle'){

                    dataGet.shareImg = _.get(response, 'data.data.pic_rectangle')
                }else {

                    dataGet.shareImg = _.get(response, 'data.data.pic_square')
                }

                if(dataGet.ardink && dataGet.ioslink){

                    let ardlink = encodeURIComponent(dataGet.ardink),
                        ioslink = encodeURIComponent(dataGet.ioslink);

                    dataGet.shareTo = Config_liveomg.shareTo + `?ardink=${ardlink}&ioslink=${ioslink}`;
                }

            }
            else {

                // dataGet = {
                //     title: _.get(response, 'data.data.title'),
                //     description: _.get(response, 'data.data.desc') || _.get(response, 'data.data.title'),
                //     shareImg: _.get(response, 'data.data.pic'),
                //     shareTo: _.get(response, 'data.data.url'),
                //     error: 'else'
                // }
            }

            dataGet.getDataSrc = G_IsDevelopment ? apiUrl + '?' + utils.jsonToUrl(apiPara) : '';
            let shareData = _.merge({}, dataGet, {apiUrl: apiUrl});

            console.log(shareData);

            res.render('share/common', {shareData: shareData});
            return;

        }).catch(function (error) {

            console.log('catch ajax消耗时间1', Date.now() - conTime);
            let dataGet = {
                error: 'catch'
            };

            dataGet.getDataSrc = G_IsDevelopment ? apiUrl + '?' + utils.jsonToUrl(apiPara) : '';
            let shareData = _.merge({}, dataGet, {apiUrl: apiUrl});

            console.log(shareData)

            res.render('share/common', {shareData: shareData});
            return;
        });
    }
};

module.exports = share;
