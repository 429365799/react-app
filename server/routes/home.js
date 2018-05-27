import { app } from '../startup'

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
    }]
]