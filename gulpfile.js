var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('style/src/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('style/'));
});

gulp.task('watch', function () {
    gulp.watch('./style/src/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);