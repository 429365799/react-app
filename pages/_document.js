import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {


    render() {
        return (
            <html>
                <Head>
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta httpEquiv="x-dns-prefetch-control" content="on" />
                    <meta name="description" content="" />
                    <meta name="keyword" content="" />

                    {/* styles */}
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}