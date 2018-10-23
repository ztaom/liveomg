import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import zh from './zh.json';

const param = process.browser ? window.LIVEME_GLOBAL_ENVIRONMENT.param : {};
const messages = {
    zh: {lang: zh}, // 中文
};
let lang = '';
lang = 'zh';

const i18n = new VueI18n({
    locale: lang,
    messages,
});

if(process.browser){
    window.GlobalDomainLanguage = messages[lang].lang;
    i18n.locale = lang;
    window.GlobalDomainLanguage = messages[lang].lang;
    window.i18n = i18n;
}
Vue.config.productionTip = false;

export default i18n;
