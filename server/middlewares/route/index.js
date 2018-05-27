import express from 'express'
import fs from 'fs'
import path from 'path'

import { readAllFiles } from '../../utils/file-utils'

export default (routerPath) => {
    const router = express.Router()
    const routerFiles = readAllFiles(routerPath)

    routerFiles.forEach(item => {
        let route = require(item).default

        if (Array.isArray(route)) {
            route.forEach(routeItem => {
                let method = routeItem.shift()
                let uri = routeItem.shift()

                if (typeof method !== 'string') {
                    throw new Error('routes不支持的method类型: ', method)
                }
    
                if (typeof uri !== 'string') {
                    throw new Error('routes不支持的url类型: ', uri)
                }
                
                router[method.toLowerCase()](uri, routeItem)
            })
        }
    })

    return router
}
