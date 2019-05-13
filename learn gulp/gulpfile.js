const {
    task,
    src,
    dest,
    series,
    watch
} = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message

task('build', function (cb) {
    // body omitted
    console.log('Gulp is running...');
    cb();
});

// 
// task('default', function (cb) {
//     console.log('Gulp is running...');
//     cb();
// });


// Copy All HTML files
task('copyHtml', function () {
    return src('src/*.html')
        .pipe(dest('dist'));
});

// Optimize Images
task('imageMin', () =>{
	return src('src/imgs/*')
		.pipe(imagemin())
		.pipe(dest('dist/images'))
});

// Minify JS
task('minify', function(){
  return src('src/js/*.js')
      .pipe(uglify())
      .pipe(dest('dist/js'));
});

// Compile Sass
task('sass', function(){
  return src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css'));
});

// Scripts
task('scripts', function(){
  return src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(dest('dist/js'));
});

// task('default', series('build', 'copyHtml', 'imageMin','minify', 'sass'));
task('default', series('build', 'copyHtml', 'imageMin', 'sass', 'scripts'));

task('watch', function(){
  watch('src/js/*.js',  series('scripts'));
  watch('src/images/*',  series('imageMin'));
  watch('src/sass/*.scss',  series('sass'));
  watch('src/*.html',  series('copyHtml'));
});