var path         = require('path');
var gulp         = require('gulp');
var less         = require('gulp-less');
var browserify   = require('gulp-browserify');
var livereload   = require('gulp-livereload');
var watch        = require('gulp-watch');
var prefix       = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var inlinesource = require('gulp-inline-source');

var lr = false;

gulp.task('less', function () {
	var stream = gulp.src('.src/less/app.less')
		.pipe(less({
			paths: [ path.join(__dirname, '.src', 'less') ]
		}))
		.pipe(prefix("last 1 version", "> 1%", "ie 9"))
		.pipe(csso())
		.pipe(gulp.dest('./src'));
	lr && stream.pipe(livereload());
});

gulp.task('scripts', function() {
	// Single entry point to browserify
	var stream = gulp.src('.src/js/app.js')
		.pipe(browserify({
			debug: true
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./src'));
	lr && stream.pipe(livereload());
});

gulp.task('watch', function() {
	lr = true;
	// calls 'build-js' whenever anything changes
	gulp.watch('.src/js/**/*.js', ['scripts']);
	gulp.watch('.src/less/**/*.less', ['less']);
});

gulp.task('build', ['scripts', 'less'], function() {

	gulp.src('./index.html')
		.pipe(inlinesource())
		.pipe(gulp.dest('./dist'));

	gulp.src('./favicon.ico')
		.pipe(gulp.dest('./dist'));

	gulp.src('./.htaccess')
		.pipe(gulp.dest('./dist'));

	gulp.src('./src/**/*')
		.pipe(gulp.dest('./dist/src'));

	gulp.src('./assets/**/*')
		.pipe(gulp.dest('./dist/assets'));
});

gulp.task('default', ['scripts', 'less']);
