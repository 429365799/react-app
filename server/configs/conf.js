import constant from './constant'

export default {
    // 各种变量
    ...constant,
    /**
     * 服务器启动的模式
     * @type {constant.SERVER_MODES}
     */
    MODE: process.env.NODE_ENV === 'production' ? constant.SERVER_MODES.PROD : constant.SERVER_MODES.DEV,
    /** 服务器监听的端口 */
    PORT: parseInt(process.env.PORT, 10) || 3000,
    /** 是否开启服务端渲染 */
    SSR: true,

}