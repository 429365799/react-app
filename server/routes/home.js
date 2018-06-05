import request from 'request';
import { app } from '../server'

export default [
    ['GET', '/user/a', (_, __, next) => {next()}, (req, res, next) => {
        console.log('hahahahah');
        res.end('heiheihei')
    }],

    ['GET', '/p/:id', async (req, res, next) => {
        const html = await app.renderToHTML(req, res, '/post', {
            title: req.params.id
        })

        res.status(200).send(html)
    }],

    ['GET', '/source-proxy', (req, res, next) => {
        let url = req.query.url
        url = decodeURIComponent(url)

        request({
            url,
        }).pipe(res);
    }],
]
