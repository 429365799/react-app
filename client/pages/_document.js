import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const { assetPrefix, buildId } = this.props.__NEXT_DATA__;
        const cssPath = process.env.NODE_ENV === 'production' ? `${assetPrefix}/app-${buildId}.css` : `/app.css`;        // ``

        return (
            <html>
                <Head>
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta httpEquiv="x-dns-prefetch-control" content="on" />
                    <meta name="description" content="" />
                    <meta name="keyword" content="" />

                    {/* styles */}
                    <link rel="stylesheet" href={ cssPath } />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    {/* <script type="text/javascript" src="https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/2.5.1/vconsole.min.js"></script> */}
                </body>
            </html>
        )
    }
}