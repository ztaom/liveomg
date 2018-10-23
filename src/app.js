// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import createStore from './store/store'
import createRouter from './router/router'
import App from './App.vue'
import VueI18n from './i18n/i18n'
import asyncData from './mixin/asyncData'
import devData from './mixin/devData'
if (process.browser){
  const infiniteScroll = require('vue-infinite-scroll');
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
  Vue.use(infiniteScroll)
}
Vue.use(VueMeta);

Vue.mixin(asyncData);
Vue.mixin(devData);

export function createApp () {
  const store = createStore();
  const router = createRouter();

  const app = new Vue({
    i18n: VueI18n,
    router,
    store,
    render: h => h(App)
  })

  return { app, store, router }
}
