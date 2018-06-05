
export default [
    [ 1, 'GET', '', (_, __, next) => {next()} ],
    [ 0, 'POST', '', (_, __, next) => {next()} ],
    [ 12, 'DELETE', '', (_, __, next) => {next()} ],
    [ 3, 'HEAD', '', (_, __, next) => {next()} ],
]