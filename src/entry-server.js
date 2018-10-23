import Vue from 'vue'
import { createApp } from './app'
import App from './App.vue'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, store, router } = createApp()

    const { url, videoid } = context;

    router.push(url);

    // 等到 router 将可能的异步组件和钩子函数解析完

    router.onError((e) => {
      console.log(e)
    })

    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents();

      //const routerMatches = router.match(url);
      const routerMatches = router.currentRoute;
      const {params, query} = routerMatches;
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map((component) => {
        const tagName = component.name;
        return component.asyncData && component.asyncData({
            tagName, params, query, store
        })
      })).then(() => {
          context.state = store.state;
          resolve(app);
      }).catch(reject);

    }, reject)

  })
}
