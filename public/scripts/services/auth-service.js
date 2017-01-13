let AuthService = (function() {
    const LOCAL_STORAGE_AUTHKEY = 'USER-AuthKey',
        LOCAL_STORAGE_USERNAME = 'localStorage-username',
        MIN_USERNAME_LENGTH = 6,
        MAX_USERNAME_LENGTH = 30,
        MIN_PASSWORD_LENGTH = 6,
        MAX_PASSWORD_LENGTH = 30;


    function register(user) {
        let url = 'api/users';

        return new Promise((resolve, reject) => {
                try {
                    validator.checkUsername(user.username, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH);
                    validator.checkPassword(user.password, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH);
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

                localStorage.setItem(LOCAL_STORAGE_USERNAME, res.result.username);
                localStorage.setItem(LOCAL_STORAGE_AUTHKEY, res.result.authKey);

                return res.result.username;
            });
    }

    function logout() {
        return new Promise(resolve => {
            localStorage.removeItem(LOCAL_STORAGE_USERNAME);
            localStorage.removeItem(LOCAL_STORAGE_AUTHKEY);
            resolve();
        });
    }

    function isLoggedIn() {
        return !!localStorage.getItem(LOCAL_STORAGE_USERNAME) &&
            !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY);
    }

    return {
        register,
        login,
        logout,
        isLoggedIn
    };
})();