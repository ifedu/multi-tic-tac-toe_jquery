const jsonData = {}

$.gulp.task('jade-min', () =>
    $.gulp
    .src([
        `${$.dev.public}/**/*.jade`,
        `!${$.dev.public}/**/_**/*.jade`,
        `!${$.dev.public}/**/_*.jade`,

        `!${$.dev.guide}/**/*.jade`,
        `!${$.dev.public}/guide.jade`
    ])
    .pipe($.data((file) => {
        const valueJson = $.fn.jsonJade(file)

        $.extend(true, jsonData, valueJson)

        return jsonData
    }))
    .pipe($.jade({
        pretty: false
    }))
    .on('error', (error) => {
        console.log(error);
    })
    .pipe($.gulp.dest($.dist.public))
)

$.gulp.task('styles-min', () =>
    $.gulp
    .src(`${$.dev.styles}/main.styl`)
    .pipe($.styles({
        compress: true
    }))
    .pipe($.gulp.dest($.dist.styles))
)

$.gulp.task('copyDeploy', (done) =>
    $.gulp
    .src([
        `${$.deploy.public}/**/*.*`,
        `${$.deploy.vendor}/**/*.*`
    ])
    .pipe($.gulp.dest($.dist.public))
)

$.gulp.task('addDependencies-dist', () =>
    $.gulp
    .src(`${$.dist.public}/**/*.html`)
    .pipe($.wiredep({
        directory: $.dist.vendor,
        exclude: ['angular-mocks'],

        onError: () => {}
    }))
    .pipe($.gulp.dest($.dist.public))
)

$.gulp.task('generateOneScriptFile', (done) => {
    const assets = $.useref.assets()

    return $.gulp
    .src(`${$.dist.public}/**/*.html`)
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.gulp.dest($.dist.public))
})

$.gulp.task('compress', () =>
    $.gulp
    .src($.dist.allJs)
    .pipe($.uglify())
    .pipe($.gulp.dest($.dist.js))
)

$.gulp.task('compress-app', () =>
    $.gulp
    .src(`${$.dist.app}/**/*.js`)
    .pipe($.uglify())
    .pipe($.gulp.dest($.dist.app))
)

$.gulp.task('clean-min', (cb) =>
    $.del([
        `${$.dist.js}/**/*.js`,
        $.dist.vendor,
        `!${$.dist.js}/all.js`
    ], {
        force: true
    }, cb)
)

$.gulp.task('templateCache-min', (done) =>
    $.gulp.src(`${$.dist.public}/**/directives/**/*.html`)
    .pipe($.templateCache('templates.js', {
        standalone: true
    }))
    .pipe($.gulp.dest($.dist.js))
)

$.gulp.task('webserver-dist', () => require(`../../${$.deploy.server}/server-dist.js`)($))

$.gulp.task('distTask', (cb) => $.runSequence('copyDeploy', 'addDependencies-dist', 'generateOneScriptFile', ['compress', 'compress-app'], 'clean-min', 'webserver-dist', cb))