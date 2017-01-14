describe('AuthService', function() {

    describe('register', function() {
        const url = 'api/users';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'post')
                .returns(Promise.resolve(objResponse));
        });

        afterEach(function() {
            jsonRequester.post.restore();
        });

        it('Expect AuthService.register to fail, when pass user with invalid username', function(done) {
            const invalidUser = {
                username: 'U',
                password: user.password
            };

            AuthService.register(invalidUser)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect AuthService.register to fail, when pass user with invalid password', function(done) {
            const invalidUser = {
                username: user.username,
                password: 'P'
            };

            AuthService.register(invalidUser)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect AuthService.register to make exactly one jsonRequester.post call', function(done) {
            AuthService.register(user)
                .then(() => {
                    expect(jsonRequester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect AuthService.register to make correct jsonRequester.post call', function(done) {
            AuthService.register(user)
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect AuthService.register to post correct user data', function(done) {
            AuthService.register(user)
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].data;
                    const prop = Object.keys(actual).sort();
                    expect(prop.length).to.equal(2);
                    expect(prop[0]).to.equal('password');
                    expect(prop[1]).to.equal('username');
                })
                .then(done, done);
        });
        it('Expect AuthService.register to return the user', function(done) {
            AuthService.register(user)
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('login', function() {
        const url = 'api/users/auth/';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect AuthService.login to make exactly one jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    expect(jsonRequester.put.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect AuthService.login to make correct jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    const actual = jsonRequester.put
                        .firstCall
                        .args[0];
                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect AuthService.login to put correct user data', function(done) {
            AuthService.login(user)
                .then(() => {
                    const actual = jsonRequester.put
                        .firstCall
                        .args[1].data;
                    const prop = Object.keys(actual).sort();

                    expect(prop.length).to.equal(2);
                    expect(prop[0]).to.equal('password');
                    expect(prop[1]).to.equal('username');
                })
                .then(done, done);
        });
        it('Expect AuthService.login to login the right user and set him in localStorage', function(done) {
            AuthService.login(user)
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_USERNAME)).to.equal(user.username);
                })
                .then(done, done);
        });
        it('Expect AuthService.login to set auth key in localStorage', function(done) {
            AuthService.login(user)
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY)).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect AuthService.login to return username of logged user', function(done) {
            AuthService.login(user)
                .then((resp) => {
                    expect(resp).to.equal(loginResponse.result.username);
                })
                .then(done, done);
        });
    });

    describe('logout', function() {

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect localStorage to have no username after AuthService.logout', function(done) {
            AuthService.login(user)
                .then(() => {
                    return AuthService.logout();
                })
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_USERNAME)).to.be.null;
                })
                .then(done, done);
        });
        it('Expect localStorage to have no authKey after AuthService.logout', function(done) {
            AuthService.login(user)
                .then(() => {
                    return AuthService.logout();
                })
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY)).to.be.null;
                })
                .then(done, done);
        });
    });

    describe('isLoggedIn', function() {
        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect AuthService.isLoggedIn to return false when not logged in', function() {
            let actual = AuthService.isLoggedIn();

            expect(actual).to.be.false;
        });
        it('Expect AuthService.isLoggedIn to return true when logged in', function(done) {
            AuthService.login(user)
                .then(() => {
                    return AuthService.isLoggedIn();
                })
                .then((resp) => {
                    expect(resp).to.be.true;
                })
                .then(done, done);
        });
    });
});