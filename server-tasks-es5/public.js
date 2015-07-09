module.exports = function ($) {
    'use strict';

    $.gulp.task('deleteGulp', function (cb) {
        return $.del($.deploy.serverTasks, {
            force: true
        }, cb);
    });

    $.gulp.task('compileGulpEs6', function (cb) {
        return $.gulp.src($.dev.serverTasks + '/*.js')
        .pipe($.changed($.deploy.serverTasks))
        .pipe($.wrap(
            'module.exports = function ($) {' +
                '<%= contents %>' +
            '};'
        ))
        .pipe($.gulp.dest($.deploy.serverTasks))
        .pipe($.babel())
        .pipe($.gulp.dest($.deploy.serverTasks));
    });

    $.gulp.task('readFolder', function () {
        $.fn.readFolder('../' + $.deploy.serverTasks);
    });

    //// COMPILES
    $.gulp.task('compile', function (cb) {
        $.runSequence('deleteGulp', 'compileGulpEs6', 'readFolder', cb);
    });

    $.gulp.task('compiledBase', function (cb) {
        $.runSequence('scripts', ['styles', 'jade'], 'copy', 'templateCache', 'clean-scripts', 'watch', cb);
    });

    // CODE
    $.gulp.task('compiledAnalysis', function (cb) {
        $.runSequence('compiledBase', 'addDependencies', 'analize', cb);
    });

    $.gulp.task('analysis', function (cb) {
        $.runSequence('compile', 'compiledAnalysis', cb);
    });

    // DIST
    $.gulp.task('compiledDist', function (cb) {
        $.runSequence('clean', 'scripts', ['styles-min', 'jade-min'], 'copy', 'templateCache-min', 'distTask', cb);
    });

    $.gulp.task('dist', function (cb) {
        $.runSequence('compile', 'compiledDist', cb);
    });

    // GUIDE
    $.gulp.task('compiledGuide', function (cb) {
        $.runSequence('compiledBase', 'guideTask', cb);
    });

    $.gulp.task('guide', function (cb) {
        $.runSequence('compile', 'compiledGuide', cb);
    });

    // RUN
    $.gulp.task('compiledRun', function (cb) {
        $.runSequence('clean', 'compiledBase', 'addDependencies', 'webserver', cb);
    });

    $.gulp.task('run', function (cb) {
        $.runSequence('compile', 'compiledRun', cb);
    });

    // TEST
    $.gulp.task('compiledTest', function (cb) {
        $.runSequence('compiledBase', 'addDependencies', 'scripts-js-test', 'karma', cb);
    });

    $.gulp.task('test', function (cb) {
        $.runSequence('compile', 'compiledTest', cb);
    });
};