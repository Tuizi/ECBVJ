var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');

function compile(watch) {
    var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log("-> babelifying...");
            rebundle();
        });
    }

    rebundle();
}

gulp.task('sass', function () {
    gulp.src('style/src/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('style/'));
});

gulp.task('watch', function () {
    gulp.watch('./style/src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch'], function () {
    compile(true);
});