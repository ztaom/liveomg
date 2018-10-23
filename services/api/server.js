const axios = require('./axios');

const service = {
    checkStatus() {
        return axios.get('/search/getcountryCode')
    }
}

module.exports = service;
