import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
    return new Vuex.Store({
        state: {
            'urlParam': {},
            'isStopV': false,
            'countryCode': ''
        },
        mutations: {
            URLPARAM(state, data) {
                state.urlParam = data;
            },
            STOPVPROP(state, param) {
                state.isStopV = param;
            },
            GETCOUNTRYCODE(state, param) {
                state.countryCode = param;
            }
        }
    })
}
