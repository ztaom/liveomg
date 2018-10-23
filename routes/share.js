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
    * url: http://localhost:3000/share/quizbiz?vid=15199037781765851023&uid=940590828789694464&type=2&countryCode=CN&host=featuremix-qa
    * wiki: https://twiki.cmcm.com/pages/viewpage.action?pageId=20945378
    * */
    quizbiz: function (req, res, next) {

        const conTime = Date.now();

        let paramsData = req.query || {};
        console.log(req.get('host'));
        let paramsStr = '';

        for (let k in paramsData) {

            // if (k == 'uid' || k == 'countryCode' || k == 'vid' || k == 'type' || k == 'short_id') {
            if (k == 'type' || k == 'short_id') {
                continue;
            }

            paramsStr += `&${k}=${paramsData[k]}`;
        }
        console.log('paramsStr', paramsStr);

        let dataRes = {
            title: Config_liveomg.quizbizTitle,
            description: Config_liveomg.quizbizDescription,
            shareImg: Config_liveomg.quizbizImg,
            shareTo: Config_liveomg.quizbizTo,
            currentUrl: req.protocol + '://' + req.get('host') + req.url
        };

        // 性能比
        console.log('ajax消耗时间', Date.now() - conTime);
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
        axios.defaults.baseURL = utils.liveomgApiHost(req);
        let apiUrl = utils.liveomgApiHost(req) + '/liveGameTrivia/h5share';
        console.log('请求的api地址: ', apiUrl);

        let apiPara = {
            uid: paramsData.uid, // 用户ID
            h5: 1,
            // area: paramsData.countryCode || 'A_US', // 默认 A_US
            countryCode: paramsData.countryCode || 'US', // 默认 us
            vid: paramsData.vid || '', // 默认为空 直播间能获取则需要传
            type: paramsData.type, // int 分享类型 1：直播间+普通邀请码 2：成功3：失败
            money_unit: paramsData.moneyUnit  //0,美元类型，1 COC
        };
        axios.get(apiUrl,
            {
                params: apiPara
            }
        ).then(function (response) {

            console.log('then ajax消耗时间1', Date.now() - conTime);
            let dataGet = {};

            if (response.status == 200 && response.data.status == 200) {

                dataGet = {
                    title: _.get(response, 'data.data.title'),
                    description: _.get(response, 'data.data.desc') || _.get(response, 'data.data.title'),
                    shareImg: _.get(response, 'data.data.pic'),
                    shareTo: _.get(response, 'data.data.url')
                };


                // 1 不需要是因为后端加了&short_id=xxx,2,3需要是因为没加，当时跟后端对，后端说直接用，具体用法问你老大，都是你们对的，没说type不同，url参数不同，只给了"url":"http://qa.www.liveomg.com/media/livequest/dist/?uid=940590828789694464&short_id=QB16574732"当时注意到code跟这里相等，就没多想多问
                if (paramsData.type == 1) {
                    dataGet.shareTo += dataGet.shareTo.match(/\?/) ? `${paramsStr}` : `?${paramsStr.replace(/\&/, '')}`
                }
                else if (paramsData.type == 2) {
                    dataGet.shareTo += `&short_id=${_.get(response, 'data.data.code')}${paramsStr}`
                }
                else if (paramsData.type == 3) {
                    dataGet.shareTo += `&short_id=${_.get(response, 'data.data.code')}${paramsStr}`
                }else {

                    dataGet.shareTo += `&moneyUnit=${paramsData.moneyUnit}`  //add for moneyUnit
                }

            }
            else {

                dataGet = {
                    title: _.get(response, 'data.data.title'),
                    description: _.get(response, 'data.data.desc') || _.get(response, 'data.data.title'),
                    shareImg: _.get(response, 'data.data.pic'),
                    shareTo: _.get(response, 'data.data.url'),
                    error: 'else'
                }
            }

            dataGet.getDataSrc = G_IsDevelopment ? apiUrl + '?' + utils.jsonToUrl(apiPara) : '';
            let shareData = _.merge({}, dataRes, dataGet, {apiUrl: apiUrl});


            console.log(shareData)

            res.render('share/quizbiz', {shareData: shareData});
            return;

        }).catch(function (error) {

            console.log('catch ajax消耗时间1', Date.now() - conTime);
            let dataGet = {
                error: 'catch'
            };

            dataGet.getDataSrc = G_IsDevelopment ? apiUrl + '?' + utils.jsonToUrl(apiPara) : '';
            let shareData = _.merge({}, dataRes, dataGet, {apiUrl: apiUrl});

            console.log(shareData)

            res.render('share/quizbiz', {shareData: shareData});
            return;
        });
    }
};

module.exports = share;
