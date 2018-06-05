require('babel-register')

const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(path.join(__dirname, '../redux-store/reducers'));
const reducerFiles = fs.readdirSync(rootPath)

const fileContent = reducerFiles.map(item => item === 'index.js' ? '' : `export * from './${item}'`).join('\n')

fs.writeFileSync(path.resolve(path.join(__dirname, '../redux-store/reducers/index.js')), fileContent, {
    encoding: 'utf8',
    flag: 'w+'
})