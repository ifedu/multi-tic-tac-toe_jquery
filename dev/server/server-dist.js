module.exports = ($) => {
    const app = $.express()

    const PORT = 8002

    // ROUTES
    app
    .use($.express.static($.dist.public))
    .use('/*', (req, res) => res.sendFile($.path.resolve(__dirname, `../../${$.dist.public}`)))
    .use('/api', (req, res) =>
        req
        .pipe($.request(`http://api${req.path}`))
        .pipe(res)
    )
    .listen(PORT, () => console.log('Listening on port %d', PORT))

    // LAUNCH
    $.open(`http://localhost:${PORT}`)
}