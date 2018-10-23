/*
* desc: 公用方法
*
* */

const Config_liveomg = require(process.cwd() + '/config/config').liveomg;

module.exports = {

    /*
    * desc: 请求接口地址
    * */
    liveomgApiHost: function (req) {

        let apiHost = Config_liveomg.baseURL;
        let paramsData = req.query || {};

        if (paramsData.host) {
            if (paramsData.host != 'live') {
                apiHost = `http://${paramsData.host}.live.ksmobile.net`;
            }
        }
        else {

            if (!req.get('host').match(/^m\.liveomg\.com/)) {
                apiHost = `http://featuremix-qa.live.ksmobile.net`
            }
        }

        return apiHost;
    },

    // return 'aa=1&bb=2'
    jsonToUrl(json) {

        let str = '';
        for (let k in json) {
            str += `${k}=${json[k]}&`;
        }
        str = str.replace(/\&$/, '');
        console.log(str)

        return str;
    }
};
