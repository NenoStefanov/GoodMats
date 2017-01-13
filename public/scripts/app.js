(function() {

    var sammyApp = Sammy('#content', function() {

        this.get('#/', function() {
            this.redirect('#/home');
        });
        this.get('#/home', MaterialsController.getAllMaterials);

        this.get('#/auth/register', AuthController.register);
        this.get('#/auth/login', AuthController.login);
        this.get('#/auth/logout', AuthController.logout);

        this.get('#/user/profile', UsersController.getProfile);
        this.get('#/user/watchlist/:category', MaterialsController.getMaterialsByCategory);

        this.get('#/users/all', UsersController.getAllUsers);
        this.get('#/users/:username', UsersController.getUser);

        this.get('#/materials/add', MaterialsController.addMaterial);
        this.get('#/materials/:id', MaterialsController.getMaterial);
    });

    $(function() {
        sammyApp.run('#/');

        if (AuthService.isLoggedIn()) {
            $("#login-form").hide();
            $("#user-list").show();
            $("#material-form").show();
        } else {
            $("#login-form").show();
            $("#user-list").hide();
            $("#material-form").hide();
        }
    });
}());