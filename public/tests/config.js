mocha.setup('bdd');

const { expect, assert } = chai;

const user = {
    username: 'USERNAME',
    password: 'PASSWORD'
};

const material = {
    title: 'SOME_MATERIAL_TITLE',
    description: 'SOME_MATERIAL_DESCRIPTION',
    img: 'http://html5beginners.com/wp-content/uploads/2014/09/js.png'
};

const AUTHKEY = 'AUTHKEY',
    LOCAL_STORAGE_AUTHKEY = 'USER-AuthKey',
    LOCAL_STORAGE_USERNAME = 'localStorage-username';