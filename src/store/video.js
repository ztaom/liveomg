import { video } from '../api/client'
let lang = process.browser ? window.navigator.language : 'CN';
lang = lang.split('-')[1];
console.log(lang)

export default {
    namespaced: true,
    state: () => ({
        asyncData: {}
    }),
    actions: {
        async SET_DATA(payload, param){
            try {
                let data = {};
                const { countryCode, area, page } = param;
                console.log(param, 111, countryCode, lang)
                data = await video.getFeatureList({
                    countryCode: countryCode ? countryCode.toUpperCase() : 'CN',
                    page_index: page || 0,
                    page_size: 20
                });
                data.param = param;
                payload.commit('ASYNCDATA', data);
            } catch (e) {
                console.log(e);
            }
        }
    },
    mutations: {
        ASYNCDATA(state, data) {
            const { param, status, videoData} = data;
            if (status == '200'){
                const _data = data.data.data;
                const videoData = _data.video_info;

                state.asyncData = {
                    status,
                    param,
                    videoData,
                    data: _data
                };

            }
        }
    }
}
