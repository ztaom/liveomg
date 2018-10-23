
const download = {
    ios: function (req, res, next) {
        const query = req.query

        if (query.url && query.pack){
            res.render('download/ios', {
                url: query.url,
                pack: query.pack
            });
        } else {
            res.render('error', {
                message: 'param error',
                error: {
                    status: '',
                    stack: ''
                }
            });
        }

    }
};

module.exports = download;
