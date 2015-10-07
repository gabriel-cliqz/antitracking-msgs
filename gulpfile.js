// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    print = require('gulp-print'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean');

var sass_source = "scss/**/*.scss",
    css_destination = "css/";


// Clean The Folder. Removes all build files
gulp.task('clean-css-folder', function () {
    return gulp.src(css_destination + '*', {read: false})
        .pipe(clean({force: true}))
});


//Build SASS
gulp.task('build-css', ['clean-css-folder'], function () {
    return gulp.src(sass_source)
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(css_destination))
        .on('end', function () {
            gutil.log('CSS is ready!')
        })
});

gulp.task('watch', function() {
  gulp.watch(sass_source, ['build-css']);
});

gulp.task('build', ['build-css', 'watch'], function () {});
