import axios from '../axios'

const Services = {
    // featurelist
    getFeatureList(param) {
        return axios.get('/live/featurelist', Object.assign({
            h5: 1,
            pid: 3,
            posid: 3002,
            tuid: 4
        }, param))
    },

    // tags标签
    getTags(param) {
        return axios.get('/search/getTags', param)
    }
}

export default Services
