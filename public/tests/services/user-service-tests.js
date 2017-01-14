describe('UsersService tests', function() {

    describe('UsersService.getUser() tests', function() {
        const response = {
            result: {}
        };
        const username = 'SOME_USERNAME';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('Expect UsersService.getUser to make exactly one jsonRequster.get call', function(done) {
            UsersService.getUser(username)
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect UsersService.getUser to make correct jsonRequester.get call', function(done) {
            UsersService.getUser(username)
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];

                    expect(actual).to.equal('api/profiles/' + username);
                })
                .then(done, done);
        });
        it('Expect UsersService.getUser to return correct result', function(done) {
            UsersService.getUser(username)
                .then((resp) => {
                    expect(resp).to.eql(response.result);
                })
                .then(done, done);
        });
    });

    describe('UsersService.getAllUsers() tests', function() {
        const respone = {
            result: []
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(respone);
                }));
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('Expect UsersService.getAllUsers to make exactly one jsonRequester.get call', function(done) {
            UsersService.getAllUsers()
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect UsersService.getAllUsers to make correct jsonRequester.get call', function(done) {
            UsersService.getAllUsers()
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];

                    expect(actual).to.equal('api/users');
                })
                .then(done, done);
        });
        it('Expect UsersService.getAllUsers to return correct result', function(done) {
            UsersService.getAllUsers()
                .then((resp) => {
                    expect(resp).to.eql(respone.result);
                })
                .then(done, done);
        });
    });

    describe('UsersService.getProfile() tests', function() {
        const response = {
            result: {}
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));

            sinon.stub(jsonRequester, 'put')
                .returns(new Promise((resolve, reject) => {
                    resolve({
                        result: {
                            username: user.username,
                            authKey: AUTHKEY
                        }
                    });
                }));

            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.get.restore();
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect UsersService.getProfile to fail, when have not logged-in user', function(done) {
            UsersService.getProfile()
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect UsersService.getProfile to make exactly one jsonRequster.get call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return UsersService.getProfile();
                })
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect UsersService.getProfile to make correct jsonRequester.get call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return UsersService.getProfile();
                })
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];

                    expect(actual).to.equal('api/profiles/' + user.username);
                })
                .then(done, done);
        });
        it('Expect UsersService.getProfile to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return UsersService.getProfile();
                })
                .then((resp) => {
                    expect(resp).to.eql(response.result);
                })
                .then(done, done);
        });
    });
});