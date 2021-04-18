module.exports.shouldAuthenticate = function (chaiRequest, token, done, stub, args) {
    chaiRequest
        .set('Authorization', 'Bearer ' + token)
        .end(function (err, res) {
            res.status.should.eq(200, res.text);
            if (stub) {
                stub.should.have.been.calledWith(...args);
            }
            if (done) {done();}
        });
};

module.exports.shouldPrevent = function (chaiRequest, token, done) {
    chaiRequest
        .set('Authorization', 'Bearer ' + token)
        .end(function (err, res) {
            res.should.have.status(401);
            done();
        });
};

module.exports.testWrongParams = function (chaiRequest, payload, params, done) {
    chaiRequest
        .send(payload)
        .end(function (err, res) {
            res.body.error.should.not.be.empty;
            const errors = res.body.error.map(e => e.param);
            for (let p of params) {
                errors.should.include(p);
            }
            res.error.should.have.status(400);
            done();
        })
};
