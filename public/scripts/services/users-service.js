let UsersService = (function() {

    function getUser(username) {
        let url = 'api/profiles/' + username;

        return jsonRequester.get(url)
            .then(res => {
                return res.result;
            });
    }

    function getAllUsers() {
        let url = 'api/users';

        return jsonRequester.get(url)
            .then(res => {
                return res.result;
            });
    }

    function getProfile() {
        return new Promise((resolve, reject) => {
                if (!AuthService.isLoggedIn()) {
                    reject('You must be logged in!');
                } else {
                    resolve();
                }
            })
            .then(() => {
                let username = localStorage.getItem(constants.LOCAL_STORAGE_USERNAME);
                return getUser(username);
            });
    }

    return {
        getUser,
        getAllUsers,
        getProfile
    };
})();