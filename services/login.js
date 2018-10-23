const server = require('./api/server');

const login = {
    async checkStatus(req, res, next) {
        try {
            const ss = await server.checkStatus();
            res.cookie('isVisit', 1, {maxAge: 60 * 1000});
            res.send(JSON.stringify(ss.data));
        } catch (e) {
            res.send(JSON.stringify({
                status: '200',
                mag: 'error request',
                data: null
            }));
        }

    }
}

module.exports = login;
