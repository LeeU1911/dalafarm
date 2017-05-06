var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-minify-css');

//script paths
var jsFiles = 'themes/e-commerce/assets/js/**/*.js',
    jsOtherPageFile = 'themes/e-commerce/assets/js/e-commerce-all-pages.js',
    jsDest = 'themes/e-commerce/static/js',
    cssFiles = 'themes/e-commerce/assets/less/**/*.less',
    cssDest = 'themes/e-commerce/static/css';

gulp.task('scripts-all', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-other-page', function() {
    return gulp.src(jsOtherPageFile)
        .pipe(concat('scripts-other-page.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts-other-page.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// compiles less files and outputs them to css
gulp.task('less-min', function() {
    gulp.src(cssFiles)
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(rename('styles.min.css'))
        .pipe(cssMin({keepBreaks: false}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('default', ['less-min','scripts-all','scripts-other-page']);
gulp.task('watch', function(){
    gulp.watch(jsFiles, ['scripts-all']);
    gulp.watch(cssFiles, ['less-min']);
    gulp.watch(jsOtherPageFile, ['scripts-other-page']);
});
