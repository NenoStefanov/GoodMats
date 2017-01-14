let AuthService = (function() {

    function register(user) {
        let url = 'api/users';

        return new Promise((resolve, reject) => {
                try {
                    validator.checkUsername(user.username, constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);
                    validator.checkPassword(user.password, constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
            .then(() => {
                return jsonRequester.post(url, {
                    data: user
                });
            })
            .then(res => {
                if (res.result.err) {
                    throw new Error(res.result.err);
                }

                return res.result;
            });
    }

    function login(user) {
        let url = 'api/users/auth/';

        return jsonRequester.put(url, {
                data: user
            })
            .then(res => {
                if (res.result.err) {
                    throw new Error(res.result.err);
                }

                localStorage.setItem(constants.LOCAL_STORAGE_USERNAME, res.result.username);
                localStorage.setItem(constants.LOCAL_STORAGE_AUTH_KEY, res.result.authKey);

                return res.result.username;
            });
    }

    function logout() {
        return new Promise(resolve => {
            localStorage.removeItem(constants.LOCAL_STORAGE_USERNAME);
            localStorage.removeItem(constants.LOCAL_STORAGE_AUTH_KEY);
            resolve();
        });
    }

    function isLoggedIn() {
        return !!localStorage.getItem(constants.LOCAL_STORAGE_USERNAME) &&
            !!localStorage.getItem(constants.LOCAL_STORAGE_AUTH_KEY);
    }

    return {
        register,
        login,
        logout,
        isLoggedIn
    };
})();