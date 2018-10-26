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

    // 游戏https://live.ksmobile.net/game/gVideoList?page_index=1&gtype=0&page_size=20&countryCode=US
    getGameList(param) {
        return axios.get('/game/gVideoList', Object.assign({
            h5: 1,
            gtype: 0
        }, param))
    },
}

export default Services
