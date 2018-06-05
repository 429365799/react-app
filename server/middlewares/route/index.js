import express from 'express'
import fs from 'fs'
import path from 'path'

import { readAllFiles } from '../../utils/file-utils'

export default (routerPath) => {
    const router = express.Router()
    const routerFiles = readAllFiles(routerPath)

    let allRoutes = routerFiles.reduce((pre, cur) => {
        let route = require(cur).default

        if (Array.isArray(route)) {
            pre = pre.concat(route)
        }

        return pre
    }, [])

    let needSortRoutes = []

    allRoutes = allRoutes.filter(item => {
        if (typeof item[0] === 'number') {
            needSortRoutes.push(item)
            return false;
        }

        return true
    })

    needSortRoutes = needSortRoutes.sort((a, b) => {
        if (a[0] > b[0]) {
            a.shift()
            b.shift()
            return true
        }
    })
    allRoutes = needSortRoutes.concat(allRoutes)

    allRoutes.forEach(routeItem => {
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

    return router
}
