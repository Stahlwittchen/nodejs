module.exports = function checkToken (req, res, next) {
    let token = req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'failed to auth token'})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: 'no token'})
    }
}