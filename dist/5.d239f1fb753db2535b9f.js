webpackJsonp([5],{368:function(t,e,a){"use strict";(function(t){var r=a(355),n=a.n(r),c=t.browser?Object.assign({},n.a.getQueryData(window.location.search),window.liveomg_GLOBAL_ENVIRONMENT.param):{};e.a={name:"omgheader",data:function(){return{countryCode:c.countryCode||"cn",gameHref:"",hotCurrent:!0}},watch:{},computed:{},methods:{},created:function(){},mounted:function(){this.gameHref="/game/"+this.countryCode+"/1","game"==c.game&&(this.hotCurrent=!1)}}}).call(e,a(50))},369:function(t,e,a){var r=a(405);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=a(353).default;n("2f964a06",r,!0,{})},403:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[t._m(0),a("p",[t._v("LiveOMG.cn是来自世界各地的实时直播评级")]),a("ul",{staticClass:"nav"},[a("li",[a("a",{class:{current:t.hotCurrent},attrs:{href:"/"}},[t._v("热门直播")])]),a("li",[a("a",{class:{current:!t.hotCurrent},attrs:{href:t.gameHref}},[t._v("游戏直播")])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",[a("a",{attrs:{href:"/"}},[t._v("LiveOMG")])])}],c=a(368),o=c.a,s=(a(404),a(129)),u=Object(s.a)(o,r,n,!1,null,"059c2bae",null);e.default=u.exports},404:function(t,e,a){"use strict";var r=a(369),n=a.n(r);n.a},405:function(t,e,a){e=t.exports=a(352)(!1),e.push([t.i,"",""])}});