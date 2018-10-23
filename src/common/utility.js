/*
 * @desc
 * @version
 * @time
 */
 var DOC = (process.browser && window.document) || {};
(function (ROOT) {
    var utility = {
        // 过滤html标记防止xss攻击
        xss(str) {
            var s = "";
            if (str.length == 0) {
                return "";
            } else {
//                s = str.replace(/&/g, "&amp;");
                s = str.replace(/</g, "&lt;");
                s = s.replace(/>/g, "&gt;");
//                s = s.replace(/ /g, "&nbsp;");
                return s;
            }
        },
        htmlEncode(str) {
            var HtmlEncode = function (str) {
                var hex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
                var preescape = str;
                var escaped = "";
                for (var i = 0; i < preescape.length; i++) {
                    var p = preescape.charAt(i);
                    escaped = escaped + escapeCharx(p);
                }

                return escaped;

                function escapeCharx(original) {
                    var found = true;
                    var thechar = original.charCodeAt(0);
                    switch (thechar) {
                        case 10:
                            return "<br/>";
                            break; //newline
                        case 32:
                            return "&nbsp;";
                            break; //space
                        case 34:
                            return "&quot;";
                            break; //"
                        case 38:
                            return "&amp;";
                            break; //&
                        case 39:
                            return "&#x27;";
                            break; //'
                        case 47:
                            return "&#x2F;";
                            break; // /
                        case 60:
                            return "&lt;";
                            break; //<
                        case 62:
                            return "&gt;";
                            break; //>
                        case 198:
                            return "&AElig;";
                            break;
                        case 193:
                            return "&Aacute;";
                            break;
                        case 194:
                            return "&Acirc;";
                            break;
                        case 192:
                            return "&Agrave;";
                            break;
                        case 197:
                            return "&Aring;";
                            break;
                        case 195:
                            return "&Atilde;";
                            break;
                        case 196:
                            return "&Auml;";
                            break;
                        case 199:
                            return "&Ccedil;";
                            break;
                        case 208:
                            return "&ETH;";
                            break;
                        case 201:
                            return "&Eacute;";
                            break;
                        case 202:
                            return "&Ecirc;";
                            break;
                        case 200:
                            return "&Egrave;";
                            break;
                        case 203:
                            return "&Euml;";
                            break;
                        case 205:
                            return "&Iacute;";
                            break;
                        case 206:
                            return "&Icirc;";
                            break;
                        case 204:
                            return "&Igrave;";
                            break;
                        case 207:
                            return "&Iuml;";
                            break;
                        case 209:
                            return "&Ntilde;";
                            break;
                        case 211:
                            return "&Oacute;";
                            break;
                        case 212:
                            return "&Ocirc;";
                            break;
                        case 210:
                            return "&Ograve;";
                            break;
                        case 216:
                            return "&Oslash;";
                            break;
                        case 213:
                            return "&Otilde;";
                            break;
                        case 214:
                            return "&Ouml;";
                            break;
                        case 222:
                            return "&THORN;";
                            break;
                        case 218:
                            return "&Uacute;";
                            break;
                        case 219:
                            return "&Ucirc;";
                            break;
                        case 217:
                            return "&Ugrave;";
                            break;
                        case 220:
                            return "&Uuml;";
                            break;
                        case 221:
                            return "&Yacute;";
                            break;
                        case 225:
                            return "&aacute;";
                            break;
                        case 226:
                            return "&acirc;";
                            break;
                        case 230:
                            return "&aelig;";
                            break;
                        case 224:
                            return "&agrave;";
                            break;
                        case 229:
                            return "&aring;";
                            break;
                        case 227:
                            return "&atilde;";
                            break;
                        case 228:
                            return "&auml;";
                            break;
                        case 231:
                            return "&ccedil;";
                            break;
                        case 233:
                            return "&eacute;";
                            break;
                        case 234:
                            return "&ecirc;";
                            break;
                        case 232:
                            return "&egrave;";
                            break;
                        case 240:
                            return "&eth;";
                            break;
                        case 235:
                            return "&euml;";
                            break;
                        case 237:
                            return "&iacute;";
                            break;
                        case 238:
                            return "&icirc;";
                            break;
                        case 236:
                            return "&igrave;";
                            break;
                        case 239:
                            return "&iuml;";
                            break;
                        case 241:
                            return "&ntilde;";
                            break;
                        case 243:
                            return "&oacute;";
                            break;
                        case 244:
                            return "&ocirc;";
                            break;
                        case 242:
                            return "&ograve;";
                            break;
                        case 248:
                            return "&oslash;";
                            break;
                        case 245:
                            return "&otilde;";
                            break;
                        case 246:
                            return "&ouml;";
                            break;
                        case 223:
                            return "&szlig;";
                            break;
                        case 254:
                            return "&thorn;";
                            break;
                        case 250:
                            return "&uacute;";
                            break;
                        case 251:
                            return "&ucirc;";
                            break;
                        case 249:
                            return "&ugrave;";
                            break;
                        case 252:
                            return "&uuml;";
                            break;
                        case 253:
                            return "&yacute;";
                            break;
                        case 255:
                            return "&yuml;";
                            break;
                        case 162:
                            return "&cent;";
                            break;
                        case '\r':
                            break;
                        default:
                            found = false;
                            break;
                    }
                    if (!found) {
                        if (thechar > 127) {
                            var c = thechar;
                            var a4 = c % 16;
                            c = Math.floor(c / 16);
                            var a3 = c % 16;
                            c = Math.floor(c / 16);
                            var a2 = c % 16;
                            c = Math.floor(c / 16);
                            var a1 = c % 16;
                            return "&#x" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + ";";
                        } else {
                            return original;
                        }
                    }
                }
            }
        },

        /*
        * 连接跳转
        directToPath({
            origin: "http://www.baidu.com",
            pathname: "",
            search: {aa: 1231,bb:""}
        })
        * */
        directToPath(json) {
            var getSearchData = process.browser ? (window.location.search.match(/^\?+/) ? this.getQueryData(window.location.search) : {}) : '';
            var removeData = toString.call(json.remove) === "[object Array]" ? json.remove : [];
            for (var i = 0; i < removeData.length; i++) {
                delete getSearchData[removeData[i]]
            }

            if (getSearchData.short) {
                // getSearchData.short = '';
                delete getSearchData.short
            }


            var searchObj = Object.assign({}, getSearchData, (json.search || {}));
            var searchStr = Object.keys(searchObj).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(searchObj[key]);
            }).join("&")
            searchStr = Object.keys(searchObj).length === 0 ? searchStr : "?" + searchStr;


            // var search = window.location.search; // ?
            // search = search.match(/\?/) ? search + '&' + (json.search || '') : (json.search ? '?' + json.search : ''); // ?
            var protocol = process.browser ? window.location.protocol : ''; // http:
            var origin = json.origin || (process.browser ? protocol + '//' + window.location.host : ''); // 不带/
            var pathname = json.pathname || (process.browser ? window.location.pathname : ''); // 需要带/

            var href = origin + pathname + searchStr;
            return href;
        },
        directTo(json) {
            window.location.href = this.directToPath(json)
        },
        browser: {
            versions: function () {
                var u = process.browser ? navigator.userAgent : '',
                    app = process.browser ? navigator.appVersion : '';
                return {
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    iPhone: u.indexOf('iPhone') > -1,
                    iPad: u.indexOf('iPad') > -1,
                };
            }(),
        },
        isMobile: function () {
            var UA = process.browser ? window.navigator.userAgent : '',
                IsAndroid = /Android|HTC/i.test(UA),
                IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA);
            return IsAndroid || IsIPhone;
        },
        uuid: function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        },
        tryOpen: function (url) {
            if (!url && url !== '') {
                return;
            }
            var frame = DOC.createElement("iframe");
            frame.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;";
            frame.src = url;
            DOC.body.appendChild(frame);
            setTimeout(function () {
                DOC.body.removeChild(frame);
            }, 10);
        },
        OpenMarket: function (obj) {
            var self = this;
            setTimeout(function () {
                var startTime = (new Date).valueOf();
                if (!!obj && !!obj.market) {
                    self.tryOpen(obj.market);
                }
                startTime = (new Date).valueOf();
                setTimeout(function () {
                    var endTime = (new Date).valueOf();
                    if (1550 > endTime - startTime && !!obj && typeof obj.fail == 'function') {
                        obj.fail();
                    } else {
                        obj.success();
                    }
                }, 1500);
            }, 100);
        },
        openGP: function () {
            var gpUrl = "https://play.google.com/store/apps/details?id=com.cmcm.live";
            var marketUrl = 'market://details?id=com.cmcm.live',
              gaDesc = '';
            gpUrl += '&referrer=utm_source%3D';
            marketUrl += '&referrer=utm_source%3D';
            if (typeof cm_web_app != 'undefined' && cm_web_app.hasOwnProperty('go2Google')) {
              cm_web_app.go2Google(gpUrl);
            } else if (typeof cm_web_app != 'undefined' && cm_web_app.hasOwnProperty('openMarket')) {
              cm_web_app.openMarket(gpUrl);
            } else if (typeof android != 'undefined' && android.hasOwnProperty('openMarket')) {
              android.openMarket(gpUrl);
            } else if (typeof ijinshan != 'undefined' && ijinshan.hasOwnProperty('go2Google')) {
              ijinshan.go2Google(gpUrl);
            } else {
              this.OpenMarket({
                market: marketUrl,
                fail: function () {
                  window.location.href = gpUrl;
                }
              });
            }
        },
        langToZone: function(lang = 'en') {
            lang = lang.toLowerCase();
            const langZone = {
                "zh": "cn",
                "ja": "jp",
                "en": "us",
                "id": "id",
                "de": "de",
                "hi": "in",
                "ar": "ar",
                "es": "es"
            };
            return langZone[lang] ? langZone[lang] : 'us';
        },
        getQueryData: function (queryString) {
            queryString = queryString.replace(/^\?+/, "").replace(/&amp;/, "&");
            var querys = queryString.split("&"),
                i = querys.length,
                _URLParms = {};
            while (i--) {
                var item = querys[i].split("=");
                if (item[0]) {
                    var value = item[1] || "";
                    try {
                        value = decodeURIComponent(value);
                    } catch (e) {
                        value = unescape(value);
                    }
                    _URLParms[decodeURIComponent(item[0])] = value;
                }
            }
            return _URLParms;
        },
        cookie: function (name, value, options) {
            if (typeof value != 'undefined') {
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                var path = options.path ? '; path=' + options.path : '';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        },
        loadJS: function (url, callback, el) {
            var script = document.createElement("script"),
                head = document.getElementsByTagName("head")[0];
            script.type = "text/javascript";
            script.async = true;
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        if (callback) {
                            callback();
                        }
                    }
                }
            } else {
                script.onload = function () {
                    if (callback) {
                        callback();
                    }
                }
            }
            script.src = url;
            if (el) {
                document.getElementById(el).appendChild(script);
            } else {
                head.insertBefore(script, head.firstChild);
            }
        },
        loadImg: function (url, cb) {
            var img = new Image();
            img.onload = function () {
                cb();
            };
            img.src = url;
        },
        dowAppStore: function () {
            //window.location.href = "https://app.appsflyer.com/id1089836344?pid=CMS&c=H5_entry_" + channel;
            window.location.href = "https://app.appsflyer.com/id1089836344?pid=websitemiddle"; // 0912修改
        },
        detctWebp: function () {
            var elem = process.browser ? document.createElement('canvas') : {};
            if (!!(elem.getContext && elem.getContext('2d'))) {
                // was able or not to get WebP representation
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            } else {
                // very old browser like IE 8, canvas not supported
                return false;
            }
        },
        download: function () {
            if (this.browser.versions.iPhone) {
              this.dowAppStore();
            } else {
              this.openGP();
            }
         },
         gotoDownload: function () { // 0912 修改
            var self = this;
            if (this.browser.versions.iPhone || this.browser.versions.iPad) {
              setTimeout(function () {
                self.dowAppStore();
              }, 2000);
            } else {
              setTimeout(function () {
                self.openGP(); //android 会跳中转页下载不兼容
              }, 500);
            }
         }
    };
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function () {
            return utility;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports.utility = utility;
    } else {
        ROOT.utility = utility;
    }
})(process.browser ? window : {});
