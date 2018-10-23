const packageJson = require('./package.json');
/*
** is test environment
*/

module.exports = function(isTest) {
    return {
        baseUrl: isTest ? 'https://live.ksmobile.net' : 'https://live.ksmobile.net',
        msgcent: isTest ? 'https://liveb.ksmobile.net/message/msgcent' : 'https://liveb.ksmobile.net/message/msgcent',
        weblogin: isTest ? 'https://imapi.ksmobile.net/api/rest/web/login' : 'https://imapi.ksmobile.net/api/rest/web/login',
        cmsAPI: isTest ? 'https://live-cms-api.ksmobile.net' : 'https://live-cms-api.ksmobile.net',
        imcKey: isTest ? 'e5t4ouvptfuma' : 'e5t4ouvptfuma',
        NODE_ENV: process.env.NODE_ENV,
        APP_VR: packageJson.version
        // baseUrl: isTest ? 'http://featuremix-qa.live.ksmobile.net' : 'https://live.ksmobile.net',
        // msgcent: isTest ? 'http://featuremix-qa.live.ksmobile.net/message/msgcent' : 'https://liveb.ksmobile.net/message/msgcent',
        // weblogin: isTest ? 'http://imapi-qa.ksmobile.net/api/rest/web/login' : 'https://imapi.ksmobile.net/api/rest/web/login',
        // cmsAPI: isTest ? 'http://qa.api.cms.cmcm.com' : 'https://live-cms-api.ksmobile.net',
        // imcKey: isTest ? 'tdrvipksr1s45' : 'e5t4ouvptfuma',
        // NODE_ENV: process.env.NODE_ENV,
        // APP_VR: packageJson.version
    };
}
