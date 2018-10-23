const axios = require('axios');
const qs = require('qs');

const ax = {
  get(url, param) {
    const baseUrl  = process.baseUrl;
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url: url,
      params: param,
      timeout: 10000
    })
  },
  post(url, param) {
    const baseUrl  = process.baseUrl;
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url: url,
      data: qs.stringify(param),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    })
  }
};

module.exports = ax;
