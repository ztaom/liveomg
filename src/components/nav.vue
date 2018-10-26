<template>
    <div class="pagenav">
        <ul>
            <li class="prev" @click="clickPrev">上一页</li>
            <li class="next" @click="clickNext">下一页</li>
            <li class="country" @click="toggleHand">
                <div class="hd">
                    直播国家<span></span>
                </div>
                <div class="bd" v-show="toggle">
                    <a href="javascript:" v-for="item in country" @click="selectCountry(item)">{{item}}</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Util from '../common/utility.js';
const param = process.browser ? Object.assign({}, Util.getQueryData(window.location.search), window.liveomg_GLOBAL_ENVIRONMENT.param) : {};
let lang = process.browser ? window.navigator.language : 'US';
lang = lang.split('-')[1];
export default {
    name: 'omgnav',
    data: function () {
        return {
            pageIndex: param.pageIndex || 0,
            country: ['中国', '美区', '日本'],
            toggle: false
        }
    },
    watch: {
    },
    computed: {
    },
    methods: {
        clickPrev() {
            this.pageIndex--;
            if(param.countryCode) {
                lang = param.countryCode;
            }

            if(this.pageIndex > 0){
                window.location.href = (param.game == 'game') ? `/game/${lang.toLowerCase()}/${this.pageIndex}` : `/${lang.toLowerCase()}/${this.pageIndex}`;
            } else {
                window.location.href = (param.game == 'game') ? `/game/${lang.toLowerCase()}/1` : `/`;
            }
        },
        clickNext() {
            this.pageIndex++;
            if(param.countryCode) {
                lang = param.countryCode;
            }

            window.location.href = (param.game == 'game') ? `/game/${lang.toLowerCase()}/${this.pageIndex}` : `/${lang.toLowerCase()}/${this.pageIndex}`;
        },
        selectCountry(item) {
            if(param.game == 'game') {
                switch (item) {
                    case '中国':
                        window.location.href = `/game/cn/`;
                        break;
                    case '美区':
                        window.location.href = `/game/us/`;
                        break;
                    case '日本':
                        window.location.href = `/game/jp/`;
                        break;
                    default:
                }
            } else {
                switch (item) {
                    case '中国':
                        window.location.href = `/cn/`;
                        break;
                    case '美区':
                        window.location.href = `/us/`;
                        break;
                    case '日本':
                        window.location.href = `/jp/`;
                        break;
                    default:
                }
            }
            this.now = 0
        },
        toggleHand() {
            this.toggle = !this.toggle;
        }

    },
    created: function () {
    },
    mounted: function () {
    }
}
</script>
<style lang="less" scoped>
</style>
