// See: http://gulpjs.com/

var buffer = require('buffer');
var csso = require('csso');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpUglify = require('gulp-uglify');
var map = require('map-stream');

gulp.task('scripts', function () {
    var header = new Buffer('javascript:');
    var footer = new Buffer('void(0);');

    gulp.src('./app/main.js')
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter('jshint-stylish'))
        .pipe(gulpUglify())
        .pipe(gulpConcat('bookmarklet.js'))
        .pipe(map(function (file, cb) {
            file.contents = buffer.Buffer.concat([header, file.contents, footer]);
            cb(null, file);
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', del.bind(null, './dist'));

gulp.task('default', ['clean', 'scripts']);