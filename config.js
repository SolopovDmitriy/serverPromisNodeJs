'use strict';

let CONFIG = {
    SERVER: {
        HOST: '127.0.0.1',
        PORT: 8089
    },
    PATH: {
        TEMP: "./template/",
        PAGE: "./template/pages/"
    }
}

CONFIG = Object.freeze(CONFIG);

module.exports = CONFIG;