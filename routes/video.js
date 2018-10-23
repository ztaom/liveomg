// vue服务端渲染路由
const fs = require('fs')
const path = require('path');
const LRU = require('lru-cache');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const isProd = process.env.NODE_ENV === 'production';
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

function videoRouter(app) {

  function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      basedir: resolve('../dist'),
      runInNewContext: false
    }))
  }

  let renderer
  let readyPromise

  const templatePath = resolve('../src/index.template.html')

  if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('../dist/vue-ssr-server-bundle.json')
    const clientManifest = require('../dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
      template,
      clientManifest
    })
  } else {
    readyPromise = require('../build/setup-dev-server')(
      app,
      templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
    )
  }

  function render (req, res) {

    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const handleError = err => {
      if (err.code) {
        const html404 = fs.readFileSync(path.resolve(__dirname, '../static/404.html'), 'utf-8');
        res.send(html404);
      } else if(err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
    }

    const { countryCode, personalId, videoid } = req.params;

    const context = {
      title: 'liveme',
      url: req.url
    }

    renderer.renderToString(context, (err, html) => {

      if(err) handleError(err);

      res.send(html);

      if (isProd && countryCode && (personalId || videoid)){
        const _pathDir = personalId ? 'u' : 'v';

        if(!fs.existsSync(path.resolve(__dirname, `../staticHtml`))) fs.mkdirSync(path.resolve(__dirname, `../staticHtml`));
        if(!fs.existsSync(path.resolve(__dirname, `../staticHtml/${countryCode}`))) fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}`));

        if (req.url.indexOf('/m/v/') >= 0){
            if(!fs.existsSync(path.resolve(__dirname, `../staticHtml/${countryCode}/m`))) fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}/m`));
            if(!fs.existsSync(path.resolve(__dirname, `../staticHtml/${countryCode}/m/v`))) fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}/m/v`));
            fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}/m/v/${ videoid }`));
            fs.writeFile(path.resolve(__dirname, `../staticHtml/${countryCode}/m/v/${ videoid }/index.html`), html, (err) => {
              if (err) throw err;
            });
        } else {
            if(!fs.existsSync(path.resolve(__dirname, `../staticHtml/${countryCode}/${_pathDir}`))) fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}/${_pathDir}`));
            fs.mkdirSync(path.resolve(__dirname, `../staticHtml/${countryCode}/${_pathDir}/${personalId || videoid}`));
            fs.writeFile(path.resolve(__dirname, `../staticHtml/${countryCode}/${_pathDir}/${personalId || videoid}/index.html`), html, (err) => {
              if (err) throw err;
            });
        }
      }

      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`)
      }
    })
  }

  return isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
  }

}

module.exports = videoRouter;
