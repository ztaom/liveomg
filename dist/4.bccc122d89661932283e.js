webpackJsonp([4],{366:function(t,e,a){"use strict";(function(t){var n=a(355),s=a.n(n),i=t.browser?Object.assign({},s.a.getQueryData(window.location.search),window.liveomg_GLOBAL_ENVIRONMENT.param):{};e.a={name:"home",data:function(){return{videolist:[],blankLi:20,isShowBlank:!0,pageIndex:0}},props:{serverData:Object},watch:{},computed:{},methods:{timetrans:function(t){var t=new Date(1e3*t);t.getFullYear(),t.getMonth(),t.getMonth(),t.getDate(),t.getDate();return(t.getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},sortNumber:function(t,e){return e.watchnumber-t.watchnumber},getVideoData:function(){var t=this;if(200==t.serverData.status){var e=t.serverData.videoData;t.videolist=e,t.videolist.sort(t.sortNumber)}}},created:function(){var t=this;t.getVideoData(),Number(i.pageIndex)?t.pageIndex=i.pageIndex:t.pageIndex=0},mounted:function(){}}}).call(e,a(50))},367:function(t,e,a){var n=a(402);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=a(353).default;s("2c4214e3",n,!0,{})},400:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"videolistwrap"},[a("ul",{staticClass:"videolist"},t._l(t.videolist,function(e,n){return a("li",[a("div",{staticClass:"num"},[t._v("\n                "+t._s(20*t.pageIndex+n+1)+"\n            ")]),a("a",{attrs:{href:"https://www.liveme.com/"+e.countryCode+"/v/"+e.vid+"/index.html?from=liveomg.cn",target:"_blank"}},[a("div",{staticClass:"pic",style:{backgroundImage:"url("+e.videocapture+")"}})]),a("div",{staticClass:"text"},[a("a",{attrs:{href:"https://www.liveme.com/"+e.countryCode+"/v/"+e.vid+"/index.html?from=liveomg.cn",target:"_blank"}},[a("h3",[t._v(t._s(e.uname))])]),a("p",[t._v("观看人数："+t._s(e.watchnumber))]),a("p",[t._v("直播时间："+t._s(t.timetrans(e.vtime)))]),a("p",[t._v("来源：liveme.com")])])])}))])},s=[],i=a(366),r=i.a,o=(a(401),a(129)),c=Object(o.a)(r,n,s,!1,null,"44304326",null);e.default=c.exports},401:function(t,e,a){"use strict";var n=a(367),s=a.n(n);s.a},402:function(t,e,a){e=t.exports=a(352)(!1),e.push([t.i,"",""])}});