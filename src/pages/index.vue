<template>
	<div>
		<omg-header></omg-header>
		<videolist :serverData="asyncData"></videolist>
		<omg-nav></omg-nav>
		<omg-adsa></omg-adsa>
		<omg-footer></omg-footer>
	</div>
</template>
<script>
import videoStoreModule from '../store/video'
import Util from '../common/utility.js';
const param = process.browser ? Object.assign({}, Util.getQueryData(window.location.search), window.LIVEME_GLOBAL_ENVIRONMENT.param) : {};
export default {
    name: 'home',
	asyncData: function ({params, query, store, tagName}) {
		store.registerModule(tagName, videoStoreModule);
		store.commit('URLPARAM', Object.assign({}, query, params));
		return store.dispatch(`${tagName}/SET_DATA`, Object.assign({}, params, query));
	},
	data() {
        return {
        };
    },
	metaInfo: {
		title: process.browser && document.title,
		script: [
			// {src: `/assets/js/head/facebook.js`, type: 'text/javascript'},
		]
	},
    components: {
		'videolist': () => import('../components/list.vue'),
		'omgHeader': () => import('../components/header.vue'),
		'omgNav': () => import('../components/nav.vue'),
		'omgAdsa': () => import('../components/adsA.vue'),
		'omgFooter': () => import('../components/footer.vue')
    },
    watch: {
    },
	computed: {
	},
    methods: {
    },
    beforeMount: function () {
    },
    mounted: function () {
    },
	destroyed () {
    	this.$store.unregisterModule('home')
  	}
}
</script>
<style lang="less">
@import '../css/index.less';
</style>
