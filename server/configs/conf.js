import path from 'path'
import constant from './constant'

export default {
    // 各种变量
    ...constant,
    name: 'server',
    version: '1.0.0',
    /** 服务器启动的模式 */
    mode: process.env.NODE_ENV === 'production' ? constant.SERVER_MODES.PROD : constant.SERVER_MODES.DEV,
    /** 服务器监听的端口 */
    port: parseInt(process.env.PORT, 10) || 3001,
    /** 服务器监听的主机 */
    host: '',
    /** 是否开启服务端渲染 */
    ssr: true,
    /** 静态文件路径 */
    staticRoot: path.resolve(path.join(__dirname, '../../public/'))
}