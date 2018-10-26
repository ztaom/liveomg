<template>
    <div class="header">
        <h1><a href="/">LiveOMG</a></h1>
        <p>LiveOMG.cn是来自世界各地的实时直播评级</p>
        <ul class="nav">
            <li><a href="/" :class="{current: hotCurrent}">热门直播</a></li>
            <li><a :href='gameHref' :class="{current: !hotCurrent}">游戏直播</a></li>
        </ul>
    </div>
</template>
<script>
import Util from '../common/utility.js';
const param = process.browser ? Object.assign({}, Util.getQueryData(window.location.search), window.liveomg_GLOBAL_ENVIRONMENT.param) : {};

export default {
    name: 'omgheader',
    data: function () {
        return {
            countryCode: param.countryCode || 'cn',
            gameHref:'',
            hotCurrent: true
        }
    },
    watch: {
    },
    computed: {
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
        this.gameHref = `/game/${this.countryCode}/1`
        if(param.game == 'game') {
            this.hotCurrent = false
        }
    }
}
</script>
<style lang="less" scoped>
</style>
