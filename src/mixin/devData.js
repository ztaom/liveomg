const zoneLang = {
    "zh": "zh"
};

export default {
   created() {
      if (!process.browser && this.$ssrContext && this.$options.asyncData) {
        const componentTag = this.$options.name;
        const asyncData = this.$store.state[componentTag] ? this.$store.state[componentTag].asyncData : {};
        const urlParam = this.$store.state.urlParam || {};
        const i18n = this.$i18n;
        const messages = i18n.messages;
        let countryCode = urlParam.countryCode || 'zh';
        countryCode = countryCode.toLowerCase();

        let lang = zoneLang[countryCode] || 'zh';
        lang = messages[lang] ? lang : 'zh';
        i18n.locale = lang;

        const _data = messages[lang];
        const title = _data.lang.title;
        const description = _data.lang.description;
        const keywords = _data.lang.keywords;
        if (asyncData.desc){
            const desc = asyncData.desc;
            this.$ssrContext.title = `${desc} ${title}`;
            this.$ssrContext.description = `${desc} ${description}`;
            this.$ssrContext.keywords = keywords;
            this.$ssrContext.mataImage = asyncData.mataImage || 'https://www.liveomg.com/assets/images/share.jpg';
        } else {

            this.$ssrContext.title = title;
            this.$ssrContext.description = description;
            this.$ssrContext.keywords = keywords;
            this.$ssrContext.mataImage = 'https://www.liveomg.com/assets/images/share.jpg';
        }

        this.$ssrContext.param = urlParam ? JSON.stringify(urlParam) : '';
        this.$ssrContext.baseUrl = process.baseUrl;
        this.$ssrContext.imcKey = process.imcKey;
        this.$ssrContext.msgcent = process.msgcent;
        this.$ssrContext.weblogin = process.weblogin;
        this.$ssrContext.cmsAPI = process.cmsAPI;
      }
    }
}
