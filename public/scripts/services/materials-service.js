let MaterialsService = (function() {
    const LOCAL_STORAGE_AUTHKEY = 'USER-AuthKey',
        LOCAL_STORAGE_USERNAME = 'localStorage-username',
        MIN_TITLE_LENGTH = 6,
        MAX_TITLE_LENGTH = 100;


    function getMaterialById(id) {
        let url = 'api/materials/' + id;

        return jsonRequester.get(url)
            .then(res => {
                return res.result;
            });
    }

    function getMaterialsByCategory(category) {
        let url = 'api/user-materials/' + category;

        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                return jsonRequester.get(url, {
                    headers: {
                        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
                    }
                });
            })
            .then(res => {
                return res.result;
            });
    }

    function getAllMaterials(filter) {
        let url = 'api/materials';

        if (filter) {
            url += '?filter=' + filter;
        }

        return jsonRequester.get(url)
            .then(res => {
                return res.result;
            });
    }

    function addMaterial(material) {
        let url = 'api/materials';

        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in to post material!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                validator.checkString('Title', material.title, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
                validator.checkString('Description', material.description);
            })
            .then(() => {
                return jsonRequester.post(url, {
                    data: material,
                    headers: {
                        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
                    }
                });
            })
            .then(res => {
                return res.result.result;
            });
    }

    function addMaterialToCategory(materialId, category) {
        let url = 'api/user-materials';

        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in to adding material to categoty!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                return jsonRequester.post(url, {
                    data: {
                        id: materialId,
                        category: category
                    },
                    headers: {
                        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
                    }
                });
            })
            .then((res => {
                return res.result;
            }));
    }

    function changeMaterialCategory(materialId, category) {
        let url = 'api/user-materials';

        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in to adding material to categoty!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                return jsonRequester.put(url, {
                    data: {
                        id: materialId,
                        category: category
                    },
                    headers: {
                        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
                    }
                });
            })
            .then((res => {
                return res.result;
            }));
    }

    function addCommentToMaterial(materialId, comment) {
        let url = 'api/materials/' + materialId + '/comments';

        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in to post comments!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                return jsonRequester.put(url, {
                    data: comment,
                    headers: {
                        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
                    }
                });
            })
            .then(res => {
                return res.result;
            });
    }


    return {
        getMaterialById,
        getMaterialsByCategory,
        getAllMaterials,
        addMaterial,
        addMaterialToCategory,
        changeMaterialCategory,
        addCommentToMaterial
    };
})();