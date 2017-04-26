var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    gutil = require('gulp-util');

gulp.task('sass', function() {
    gutil.log(gutil.colors.green('开始编译 SCSS'));
    return gulp.src('views/src/scss/**/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'not ie <= 8', 'safari 5', 'ios 6', 'android 4'],
            cascade: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('views/build/css'));
});

gulp.task('script', function() {
    gutil.log(gutil.colors.green('开始压缩 JS'));
    gulp.src('views/src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('views/build/js'))
})

gulp.task('clean', function() {
    del(['views/build/css', 'views/build/js'])
});

gulp.task('default', function() {
    gutil.log(gutil.colors.green('Watch JS & SCSS ') + 'Success');
    gulp.watch('views/src/scss/**/*.scss', ['sass']);
    gulp.watch('views/src/js/*.js', ['script']);
})

gulp.task('build', ['clean'], function() {
    gulp.start(['script', 'sass']);
});
