<template>
    <div class="videolistwrap">
        <ul class="videolist">
            <li v-for="(item, index) in videolist">
                <div class="num">
                    {{index + 1}}
                </div>
                <a :href="`https://www.liveme.com/${item.countryCode}/v/${item.vid}/index.html?from=liveomg.cn`" target="_blank">
                    <div class="pic" :style="{backgroundImage:`url(${item.videocapture})`}"></div>
                </a>
                <div class="text">
                    <a :href="`https://www.liveme.com/${item.countryCode}/v/${item.vid}/index.html?from=liveomg.cn`" target="_blank">
                        <h3>{{item.uname}}</h3>
                    </a>
                    <p>观看人数：{{item.watchnumber}}</p>
                    <p>直播时间：{{timetrans(item.vtime)}}</p>
                    <p>来源：liveme.com</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    name: 'home',
    data: function () {
        return {
            videolist: [],
            blankLi: 20,
            isShowBlank: true
        }
    },
    props: {
        'serverData': Object
    },
    watch: {
    },
    computed: {
    },
    methods: {
        timetrans(date) {
            var date = new Date(date*1000);//如果date为10位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
            return h+m+s;
        },
        sortNumber(a, b) {
            return b.watchnumber - a.watchnumber
        },
        getVideoData() {
            const self = this;
            if(self.serverData.status == 200){
                let vdata = self.serverData.videoData
                self.videolist = vdata;
                self.videolist.sort(self.sortNumber)
            }
        }
    },
    created: function () {
        const self = this;
        self.getVideoData();
    },
    mounted: function () {
    }
}
</script>
<style lang="less" scoped>
</style>
