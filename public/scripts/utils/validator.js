var validator = (function() {

    function checkIfString(name, argument) {
        if (typeof(argument) !== 'string') {
            throw new Error(`${name} must be string!`);
        }
    }

    function checkStringLength(name, string, min, max) {
        min = min || Math.max;
        max = max || -Math.max;

        if (string.length < min || string.length > max) {
            throw new Error(`${name} must be between ${min} and ${max} symbols!`);
        }
    }

    function checkString(name, string, min, max) {
        checkIfString(name, string);
        checkStringLength(name, string, min, max);
    }

    function checkUsername(username, min, max) {
        checkString('Username', username, min, max);

        if (!(/^([a-zA-Z0-9_.]+)$/.test(username))) {
            throw new Error('Username can contain only latin letters, digits and the characters \'_\' and \'.\'!');
        }
    }

    function checkPassword(password, min, max) {
        checkString('Password', password, min, max);

        if (!(/^[a-zA-Z0-9]+$/).test(password)) {
            throw new Error('Password can contain only latin letters and digits!');
        }
    }

    return {
        checkString,
        checkUsername,
        checkPassword
    };
})();