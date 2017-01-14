describe('AuthService tests', function() {

    describe('AuthService.register() tests', function() {
        const response = {
            result: user
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'post')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));
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

                    expect(actual).to.equal('api/users');
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
                    expect(resp).to.eql(user);
                })
                .then(done, done);
        });
    });

    describe('AuthService.login() tests', function() {
        const response = {
            result: {
                username: user.username,
                authKey: AUTHKEY
            }
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));
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
                    expect(actual).to.equal('api/users/auth/');
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
                    expect(resp).to.equal(user.username);
                })
                .then(done, done);
        });
    });

    describe('AuthService.logout() tests', function() {
        const response = {
            result: {
                username: user.username,
                authKey: AUTHKEY
            }
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));
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

    describe('AuthService.isLoggedIn() tests', function() {
        const response = {
            result: {
                username: user.username,
                authKey: AUTHKEY
            }
        };

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .returns(new Promise((resolve, reject) => {
                    resolve(response);
                }));
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