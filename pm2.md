# pm2 使用说明

# pm2 用法（mac sudo命令）
    生成配置文件
    sudo pm2 ecosystem
    
    启动
    sudo pm2 start app.js --name "my-api"
    
    sudo pm2 start app.js --name "my-api" --watch
    
    查看log
    sudo pm2 log
    
    停止所有
    sudo pm2 stop all
    
    停止单个
    sudo pm2 stop my-api
    
    删除my-api
    sudo pm2 delete my-api
    
    重启
    sudo pm2 restart my-api
    
    更新
    sudo pm2 update
    
    打开监视器
    sudo pm2 monit
    
    pm2 show <id|name> to get more details about an app
    sudo pm2 show  my-api
    
    
    pm2 describe <id|name> 
    sudo pm2 describe my-api 
    
    查看<id|name>  最近的输出和错误log
    sudo pm2 logs my-api
    
    
    # 根据机器CPU核数，开启对应数目的进程
    sudo pm2 start app.js -i max
    
    
    日志输出添加时间戳：
    sudo pm2 logs --timestamp "HH:mm:ss" my-api
    
    pm2 logs my-api [--lines 1000]` to display logs
    sudo pm2 logs my-api [--lines 1000]
    
    
    pm2提供的web api通过json输出了很多信息
    运行西边代码，然后打开http://127.0.0.1:9615/ 
    sudo pm2 web
    
    
#   pm2 + nginx
    无非就是在nginx上做个反向代理配置，直接贴配置。
    
    upstream my_nodejs_upstream {
        server 127.0.0.1:3001;
    }
    
    server {
        listen 80;
        server_name my_nodejs_server;
        root /home/www/project_root;
    
        location / {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_max_temp_file_size 0;
            proxy_pass http://my_nodejs_upstream/;
            proxy_redirect off;
            proxy_read_timeout 240s;
        }
    }

# pm2高级用法
    pm2支持配置文件启动：
    pm2 ecosystem： 生成配置文件ecosystem.json
    pm2 startOrRestart /file/path/ecosystem.json : 通过配置文件启动服务
    
#   启动node服务
    sudo node service/bin/www 
    sudo pm2 start service/bin/www 
    
#   开发启动
    sudo nodemon service/bin/www
    
#   启动cms
    cd service npm run prev




上述采用cluster模式启动了4个服务进程；如果服务占用的内存超过300M，会自动进行重启。

##  配置项

name  应用进程名称；

script  启动脚本路径；

cwd  应用启动的路径，关于script与cwd的区别举例说明：在/home/polo/目录下运行/data/release/node/
index.js，此处script为/data/release/node/index.js，cwd为/home/polo/；

args  传递给脚本的参数；

interpreter  指定的脚本解释器；

interpreter_args  传递给解释器的参数；

instances  应用启动实例个数，仅在cluster模式有效，默认为fork；

exec_mode  应用启动模式，支持fork和cluster模式；

watch  监听重启，启用情况下，文件夹或子文件夹下变化应用自动重启；

ignore_watch  忽略监听的文件夹，支持正则表达式；

max_memory_restart  最大内存限制数，超出自动重启；

env  环境变量，object类型，如{"NODE_ENV":"production", "ID": "42"}；

log_date_format  指定日志日期格式，如YYYY-MM-DD HH:mm:ss；

error_file  记录标准错误流，$HOME/.pm2/logs/XXXerr.log)，代码错误可在此文件查找；

out_file  记录标准输出流，$HOME/.pm2/logs/XXXout.log)，如应用打印大量的标准输出，会导致pm2日志过大；

min_uptime  应用运行少于时间被认为是异常启动；

max_restarts  最大异常重启次数，即小于min_uptime运行时间重启次数；

autorestart  默认为true, 发生异常的情况下自动重启；

cron_restart  crontab时间格式重启应用，目前只支持cluster模式；

force  默认false，如果true，可以重复启动一个脚本。pm2不建议这么做；

restart_delay  异常重启情况下，延时重启时间；