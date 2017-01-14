mocha.setup('bdd');

const { expect, assert } = chai;

const AUTHKEY = 'AUTHKEY';

const username = 'USERNAME',
    password = 'PASSWORD';

const user = {
    username,
    password
};

const material = {
    title: 'MATERIAL_TITLE',
    description: 'MATERIAL_DESCRIPTION',
    img: 'MATERIAL_IMAGE_LINK'
};

const loginResponse = {
    result: {
        username: username,
        authKey: AUTHKEY
    }
};

const objResponse = {
    result: {
        result: 'FAKE_RESPONSE'
    }
};

const arrResponse = {
    result: ['FAKE_RESPONSE']
};