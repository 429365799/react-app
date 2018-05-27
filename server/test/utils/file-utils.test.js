const path = require('path')

require('babel-register');
const { readAllFiles } = require('../../utils/file-utils');

let files = readAllFiles(path.resolve(path.join(__dirname, '../../../node_modules/acorn')));
console.log(files)