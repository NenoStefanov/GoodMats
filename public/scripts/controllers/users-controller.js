let UsersController = (function() {

    function getUser(context) {
        Promise.all([
                UsersService.getUser(context.params.username),
                templates.get('user')
            ])
            .then(response => {
                let user = response[0],
                    template = response[1];

                context.$element().html(template(user));
            })
            .catch(err => toastr.error(err));
    }

    function getProfile(context) {
        Promise.all([
                UsersService.getProfile(),
                templates.get('profile')
            ])
            .then(response => {
                let user = response[0],
                    template = response[1];

                context.$element().html(template(user));
            })
            .catch(err => {
                toastr.error(err);
                setTimeout(function() {
                    context.redirect('#/');
                }, 1000);
            });
    }

    function getAllUsers(context) {
        Promise.all([
                UsersService.getAllUsers(),
                templates.get('users')
            ])
            .then(response => {
                let users = response[0],
                    template = response[1];

                context.$element().html(template(users));
            })
            .catch(err => toastr.error(err));
    }

    return {
        getUser,
        getProfile,
        getAllUsers
    };
})();