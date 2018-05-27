import 'babel-polyfill'
import express from 'express'
import path from 'path'
import next from 'next'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Multer from 'multer'
import logger from 'morgan'
import helmet from 'helmet'

// components
import routes from './middlewares/route'

import conf from './configs/conf'

const server = express()
const app = next({ dev: conf.mode === conf.SERVER_MODES.DEV })

/**
 * 启动服务器
 */
!(async function startServer() {
    // 配置常用变量
    server.set('name', conf.name)
    server.set('version', conf.version)
    server.set('mode', conf.mode)
    
    // 应用直接面向互联网，客户端 IP 地址从 req.connection.remoteAddress 得来
    server.enable('trust proxy')
    
    // for parsing application/json
    server.use(bodyParser.json({
        limit: '10mb',
    }));
    
    // for parsing application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({
        extended: true,
        limit: '10mb',
    }));
    
    // for parsing multipart/form-data file upload
    server.use(new Multer().single('file'));
    
    // logger
    server.use(logger(':remote-addr - :remote-user ":method :url HTTP/:http-version" ":referrer" ":user-agent" :status :res[content-length] - :response-time ms'))
    
    // 安全措施
    // contentSecurityPolicy?: boolean,
    // dnsPrefetchControl?: boolean,
    // frameguard?: boolean,
    // hidePoweredBy?: boolean,
    // hpkp?: boolean,
    // hsts?: boolean,
    // ieNoOpen?: boolean,
    // noCache?: boolean,
    // noSniff?: boolean,
    // xssFilter?: boolean,
    // expectCt?: boolean,
    server.use(helmet())
    
    // static
    server.use(express.static(conf.staticRoot, {
        maxAge: conf.mode === 'prod' ? 30 * 24 * 3600 * 1000 : 0,
        index: false,
        redirect: false
    }))
    
    // 使用带签名的cookie，提高安全性
    server.use(cookieParser('$asdfeozasdfFFEEefdsXOPsf...zofsdE5il'))

    // next 配置
    try {
        const handle = app.getRequestHandler()
        await app.prepare()

        server.use(routes(path.resolve(path.join(__dirname, './routes'))));

        server.get('*', (req, res) => {
            return handle(req, res)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    
    // 启动配置
    const serverOptions = [
        conf.port,
    ];
    
    // 配置监听host
    if (conf.host) {
        serverOptions.push(conf.host);
    }
    
    // 监听回调
    serverOptions.push(() => {
        console.log(`[mode:${conf.mode}] listening on port ${conf.port}`);
        process.on('SIGINT', () => {
            process.kill(process.pid)
        })
    })
    
    server.listen(...serverOptions)
})();

export {
    app
}