var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

// listens for changes to any file that has an extension .less inside styles folder
gulp.task('watch', function() {
  gulp.watch(['./server/public/styles/*.less'], ['compile-less'])
})

gulp.task('compile-less', function() {
  gulp.src('./server/public/styles/*.less')
  .pipe(less())
  .pipe(gulp.dest('./server/public/styles'))
})

// when you run just "gulp" it runs these two tasks by default
gulp.task('default', ['compile-less', 'watch'])
