describe('UsersService', function() {

    describe('getUser', function() {
        const url = 'api/profiles/' + username;

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(Promise.resolve(objResponse));
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

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect UsersService.getUser to return correct result', function(done) {
            UsersService.getUser(username)
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('getAllUsers', function() {
        const url = 'api/users';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(Promise.resolve(arrResponse));
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

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect UsersService.getAllUsers to return correct result', function(done) {
            UsersService.getAllUsers()
                .then((resp) => {
                    expect(resp).to.eql(arrResponse.result);
                })
                .then(done, done);
        });
    });

    describe('getProfile', function() {
        const url = 'api/profiles/' + user.username;

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(Promise.resolve(objResponse));
            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));
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

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect UsersService.getProfile to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return UsersService.getProfile();
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });
});