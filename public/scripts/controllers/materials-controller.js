let MaterialsController = (function() {

    function getMaterial(context) {
        Promise.all([
                MaterialsService.getMaterialById(context.params.id),
                templates.get('material')
            ])
            .then(response => {
                let material = response[0],
                    template = response[1],
                    isLoggedIn = AuthService.isLoggedIn();

                material = parseMaterialsDate([material])[0];
                context.$element().html(template({ material, isLoggedIn }));
            })
            .then(() => {
                $('#material-status').on('change', (ev) => {
                    let materialId = $('#material').attr('data-id'),
                        category = $(ev.target).val();

                    MaterialsService.addMaterialCategory(materialId, category)
                        .then(() => {
                            toastr.success('Material is successfull add to category ' + category);
                        })
                        .catch(err => {
                            return MaterialsService.changeMaterialCategory(materialId, category)
                                .then(() => {
                                    toastr.success('Material status is successfull changed to ' + category);
                                })
                                .catch(err => {
                                    $(ev.target).val('initial');
                                    toastr.error(err);
                                });
                        });
                });

                $('#btn-add-comment').on('click', () => {
                    let materialId = $('#material').attr('data-id'),
                        comment = {
                            commentText: $('#tb-add-comment').val()
                        };

                    MaterialsService.addMaterialComment(materialId, comment)
                        .then(() => {
                            toastr.success('You successfull post comment!');
                            setTimeout(function() {
                                location.reload();
                            }, 2000);
                        })
                        .catch(err => toastr.error(err));
                });
            })
            .catch(err => toastr.error(err));
    }

    function getMaterialsByCategory(context) {
        let category = context.params.category;

        Promise.all([
                MaterialsService.getMaterialsByCategory(category),
                templates.get('materials-by-category')
            ])
            .then(response => {
                let materials = response[0],
                    template = response[1];

                parseMaterialsDate(materials);
                context.$element().html(template({ materials, category }));
            })
            .catch(err => {
                toastr.error(err);
                context.redirect('#/');
            });
    }

    function getAllMaterials(context) {
        Promise.all([
                MaterialsService.getAllMaterials(context.params.filter),
                templates.get('materials')
            ])
            .then(response => {
                let materials = response[0],
                    template = response[1];

                parseMaterialsDate(materials);
                context.$element().html(template(materials));
            })
            .then(() => {
                $('#home-search-btn').on('click', () => {
                    let filter = $('#home-search-input').val();

                    context.redirect('#/home?filter=' + filter);
                    document.location.reload(true);
                });
            })
            .catch(err => toastr.error(err));
    }

    function addMaterial(context) {
        if (!AuthService.isLoggedIn()) {
            toastr.error('You must be logged in to post material!');
            context.redirect('#/');
            return;
        }

        templates.get('add-material')
            .then(template => {
                context.$element().html(template());
            })
            .then(() => {
                $('#btn-add-material').on('click', function() {
                    let material = {
                        title: $('#tb-title').val(),
                        description: $('#tb-description').val(),
                        img: $('#tb-img').val()
                    };

                    MaterialsService.addMaterial(material)
                        .then(() => {
                            toastr.success('You successfull create material');
                            context.redirect('#/');
                            document.location.reload(true);
                        })
                        .catch(err => toastr.error(err));
                });
            })
            .catch(err => toastr.error(err));
    }

    function parseMaterialsDate(materials) {
        for (let material of materials) {
            let date = material.createdOn;
            material.createdOn = date.substr(11, 8) + ' ' + date.substr(0, 10);
        }
        return materials;
    }

    return {
        getMaterial,
        getMaterialsByCategory,
        getAllMaterials,
        addMaterial
    };
})();