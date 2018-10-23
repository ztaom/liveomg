import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/:countryCode/:page/(index.html)?', component: () => import('../pages/index.vue') },
            { path: '/:countryCode/(index.html)?', component: () => import('../pages/index.vue') },
            { path: '/(index.html)?', component: () => import('../pages/index.vue') }
        ]
    })
}
