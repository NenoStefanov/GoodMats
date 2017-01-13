let AuthController = (function() {

    function register(context) {
        templates.get('register')
            .then(template => {
                context.$element().html(template());
            })
            .then(() => {
                $('#btn-register').on('click', () => {
                    let user = {
                        username: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    AuthService.register(user)
                        .then(() => {
                            toastr.success('Successfull register!');
                            setTimeout(function() {
                                context.redirect('#/auth/login');
                                document.location.reload(true);
                            }, 1000);
                        })
                        .catch(err => {
                            if (err.responseText) {
                                err = 'Error: ' + JSON.parse(err.responseText).result.err;
                            }
                            toastr.error(err);
                        });
                });
            })
            .catch(err => toastr.error(err));
    }

    function login(context) {
        templates.get('login')
            .then(template => {
                context.$element().html(template());
            })
            .then(() => {
                $('#btn-login').on('click', () => {
                    let user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };

                    AuthService.login(user)
                        .then(() => {
                            toastr.success('Successfull login!');
                            setTimeout(() => {
                                context.redirect('#/');
                                document.location.reload(true);
                            }, 1000);
                        })
                        .catch(err => {
                            toastr.error(err);
                        });
                });
            })
            .catch(err => toastr.error(err));
    }

    function logout(context) {
        AuthService.logout()
            .then(() => {
                toastr.success('Successfull logout!');
                setTimeout(() => {
                    context.redirect('#/');
                    document.location.reload(true);
                }, 1000);
            });
    }

    return {
        register,
        login,
        logout
    };
})();