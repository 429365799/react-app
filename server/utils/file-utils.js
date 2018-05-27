import fs from 'fs'
import path from 'path'
import { throws } from 'assert';

/**
 * 列出文件夹的所有文件
 * @param {strint} dirPath 文件的绝对路径
 */
export const readAllFiles = (dirPath) => {
    if (!path.isAbsolute(dirPath)) {
        throw new Error('dirPath must be an absolute path！')
    }

    if (!fs.statSync(dirPath).isDirectory()) {
        return new Error('dirPath not a directory!')
    }

    let ret = []
    const dirFiles = fs.readdirSync(dirPath)

    dirFiles.forEach(item => {
        const filePath = path.join(dirPath, item)
        const fstat = fs.statSync(filePath)

        if (fstat.isDirectory()) {
            ret = ret.concat(readAllFiles(filePath))
        } else {
            ret.push(filePath)
        }
    })
    
    return ret
}

