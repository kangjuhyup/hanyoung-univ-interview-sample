"use strict";
exports.__esModule = true;
exports.createDirectoryIfNotExists = void 0;
var fs = require("fs");
var createDirectoryIfNotExists = function (directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};
exports.createDirectoryIfNotExists = createDirectoryIfNotExists;
