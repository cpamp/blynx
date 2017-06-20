var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js:uglify', () => {
    gulp.src('./dist/*.js')
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('dist'))
});