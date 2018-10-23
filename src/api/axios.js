import axios from 'axios'
import qs from 'qs'

const baseUrl  = process.browser ? window.LIVEME_GLOBAL_ENVIRONMENT.baseUrl : process.baseUrl;

const ax = {
  get(url, param) {
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url: url,
      params: param,
      timeout: 10000
    })
  },
  post(url, param) {
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

export default ax;
