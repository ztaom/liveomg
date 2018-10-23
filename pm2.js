

var pm2 = require('pm2');


pm2.launchBus(function(err, bus) {
    // console.log('bus: ', bus)
    bus.on('process:msg', function(packet) {
        console.log('packet: ', packet)
        packet.data.success.should.eql(true);
        packet.process.pm_id.should.eql(proc1.pm2_env.pm_id);
        done();
    });
    bus.on('process:event', function(e) {
        console.log('process:event', e.manually, 'e.event', e.event)
        // if (e.manually === true) return;

        // e.event start online exit restart reload gracefulReload

        // if (e.event == 'exit') {
        //     console.log('PM2 退出了。');
        // }
        switch(e.event) {
            case 'start':
                console.log('PM2 启动了。');
                break;
            case 'online':
                console.log('PM2 运行中。');
                break;
            case 'exit':
                console.log('PM2 退出了。');
                break;
            case 'restart':
                console.log('PM2 重启了。');
                break;
            case 'reload':
                console.log('PM2 reload了。');
                break;
            case 'graceful reload':
                console.log('PM2 graceful reload。');
                break;
            default:
                console.log('PM2 未知事件。', e.event);
        }

    });

    bus.on('pm2:kill', function() {
        console.log('pm2:kill')
        console.error('PM2 is beeing killed');
    });
});
