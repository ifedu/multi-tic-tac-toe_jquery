module.exports = ($) =>
    $.gulp.task('webserver', () => require(`../../${$.deploy.server}/server.js`)($))