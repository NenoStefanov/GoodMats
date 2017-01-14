describe('MaterialsService', function() {
    describe('getMaterialById', function() {
        const materialId = 1;
        const url = 'api/materials/' + materialId;

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(Promise.resolve(objResponse));
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('Expect MaterialsService.getMaterialById to make exactly one jsonRequester.get call', function(done) {
            MaterialsService.getMaterialById(materialId)
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getMaterialById to make correct jsonRequester.get call', function(done) {
            MaterialsService.getMaterialById(materialId)
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];
                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getMaterialById to return correct result', function(done) {
            MaterialsService.getMaterialById(materialId)
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('getMaterialsByCategory', function() {
        const category = 'watched';
        const url = 'api/user-materials/' + category;

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

        it('Expect MaterialsService.getMaterialsByCategory to fail, when have not logged-in user', function(done) {
            MaterialsService.getMaterialsByCategory(category)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.getMaterialsByCategory to make exactly one jsonRequester.get call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.getMaterialsByCategory(category);
                })
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getMaterialsByCategory to make correct jsonRequester.get call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.getMaterialsByCategory(category);
                })
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];
                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getMaterialsByCategory to get with correct authorization headers', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.getMaterialsByCategory(category);
                })
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[1].headers['x-auth-key'];

                    expect(actual).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getMaterialsByCategory to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.getMaterialsByCategory(category);
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('getAllMaterials', function() {
        const url = 'api/materials';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'get')
                .returns(Promise.resolve(arrResponse));
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('Expect MaterialsService.getAllMaterials to make exactly one jsonRequester.get call', function(done) {
            MaterialsService.getAllMaterials()
                .then(() => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getAllMaterials to make correct jsonRequester.get call', function(done) {
            MaterialsService.getAllMaterials()
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getAllMaterials to make correct jsonRequester.get call, when is passed filter parameter', function(done) {
            let filter = 'javascript',
                url = 'api/materials' + '?filter=' + filter;

            MaterialsService.getAllMaterials(filter)
                .then(() => {
                    const actual = jsonRequester.get
                        .firstCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.getAllMaterials to return correct result', function(done) {
            MaterialsService.getAllMaterials()
                .then((resp) => {
                    expect(resp).to.eql(arrResponse.result);
                })
                .then(done, done);
        });
    });

    describe('addMaterial', function() {
        const url = 'api/materials';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'post')
                .returns(Promise.resolve(objResponse));
            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.post.restore();
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect MaterialsService.addMaterial to fail, when have not logged-in user', function(done) {
            MaterialsService.addMaterial(material)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.addMaterial to fail, when pass material with invalid title', function(done) {
            const invalidMaterial = {
                title: 'js',
                description: material.description
            };

            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(invalidMaterial);
                })
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.addMaterial to fail, when pass material with invalid description', function(done) {
            const invalidMaterial = {
                title: material.title,
                description: 1
            };

            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(invalidMaterial);
                })
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.addMaterial to make exactly one jsonRequester.post call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(material);
                })
                .then(() => {
                    expect(jsonRequester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterial to make correct jsonRequester.post call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(material);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterial to post with correct authorization headers', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(material);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].headers['x-auth-key'];

                    expect(actual).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterial to post with correct material', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(material);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].data;

                    expect(actual).to.eql(material);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterial to return tha material', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterial(material);
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result.result);
                })
                .then(done, done);
        });
    });

    describe('addMaterialToCategory', function() {
        const materialId = 'SOME_MATERIAL_ID',
            category = 'SOME_MATERIAL_CATEGORY',
            url = 'api/user-materials';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'post')
                .returns(Promise.resolve(objResponse));

            sinon.stub(jsonRequester, 'put')
                .returns(Promise.resolve(loginResponse));

            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.post.restore();
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect MaterialsService.addMaterialToCategory to fail, when have not logged-in user', function(done) {
            MaterialsService.addMaterialToCategory(materialId, category)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.addMaterialToCategory to make exactly one jsonRequester.post call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then(() => {
                    expect(jsonRequester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterialToCategory to make correct jsonRequester.post call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterialToCategory to post with correct authorization headers', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].headers['x-auth-key'];

                    expect(actual).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterialToCategory to post with correct material id', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].data.id;

                    expect(actual).to.equal(materialId);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterialToCategory to post with correct category', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.post
                        .firstCall
                        .args[1].data.category;

                    expect(actual).to.equal(category);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addMaterialToCategory to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addMaterialToCategory(materialId, category);
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('changeMaterialCategory', function() {
        const materialId = 'SOME_MATERIAL_ID',
            category = 'SOME_MATERIAL_CATEGORY',
            url = 'api/user-materials';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .onFirstCall().returns(Promise.resolve(loginResponse))
                .onSecondCall().returns(Promise.resolve(objResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect MaterialsService.changeMaterialCategory to fail, when have not logged-in user', function(done) {
            MaterialsService.changeMaterialCategory(materialId, category)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.changeMaterialCategory to make exactly one jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then(() => {
                    expect(jsonRequester.put.calledTwice).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.changeMaterialCategory to make correct jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.changeMaterialCategory to put with correct authorization headers', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[1].headers['x-auth-key'];

                    expect(actual).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.changeMaterialCategory to put with correct material id', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[1].data.id;

                    expect(actual).to.equal(materialId);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.changeMaterialCategory to put with correct category', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[1].data.category;

                    expect(actual).to.equal(category);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.changeMaterialCategory to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.changeMaterialCategory(materialId, category);
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });

    describe('addCommentToMaterial', function() {
        const comment = {
            commentText: 'SOME_COMMENT_TEXT'
        };
        const materialId = 'SOME_MATERIAL_ID',
            url = 'api/materials/' + materialId + '/comments';

        beforeEach(function() {
            sinon.stub(jsonRequester, 'put')
                .onFirstCall().returns(Promise.resolve(loginResponse))
                .onSecondCall().returns(Promise.resolve(objResponse));
            localStorage.clear();
        });

        afterEach(function() {
            jsonRequester.put.restore();
            localStorage.clear();
        });

        it('Expect MaterialsService.addCommentToMaterial to fail, when have not logged-in user', function(done) {
            MaterialsService.addCommentToMaterial(materialId, comment)
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it('Expect MaterialsService.addCommentToMaterial to make exactly one jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addCommentToMaterial(materialId, comment);
                })
                .then(() => {
                    expect(jsonRequester.put.calledTwice).to.be.true;
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addCommentToMaterial to make correct jsonRequester.put call', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addCommentToMaterial(materialId, comment);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addCommentToMaterial to put with correct authorization headers', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addCommentToMaterial(materialId, comment);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[1].headers['x-auth-key'];

                    expect(actual).to.equal(AUTHKEY);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addCommentToMaterial to put with correct comment', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addCommentToMaterial(materialId, comment);
                })
                .then(() => {
                    const actual = jsonRequester.put
                        .secondCall
                        .args[1].data;

                    expect(actual).eql(comment);
                })
                .then(done, done);
        });
        it('Expect MaterialsService.addCommentToMaterial to return correct result', function(done) {
            AuthService.login(user)
                .then(() => {
                    return MaterialsService.addCommentToMaterial(materialId, comment);
                })
                .then((resp) => {
                    expect(resp).to.eql(objResponse.result);
                })
                .then(done, done);
        });
    });
});