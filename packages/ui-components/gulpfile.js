var gulp = require('gulp');


gulp.task('move-sass', () => {
    return gulp.src('./src/**/*.scss', {base: './src/'})
        .pipe(gulp.dest('./dist/main'));
});