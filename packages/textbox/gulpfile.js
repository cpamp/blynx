var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglyCss = require('gulp-uglifycss');
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('js:uglify', ['css:inline'], () => {
    return gulp.src('./dist/index.js')
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('css:build', () => {
    return gulp.src('./src/styles.scss')
        .pipe(sass())
        .pipe(uglyCss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('css:inline', ['css:build'], () => {
    return gulp.src('./dist/index.js')
        .pipe(replace(/\$jb\-css\-styles/g, () => fs.readFileSync('./dist/styles/styles.css', 'utf-8')))
        .pipe(gulp.dest('dist'));
})