var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require("gulp-sass");
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var eslint       = require('gulp-eslint');
var cleanCss     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var ejs          = require('gulp-ejs');
var wait         = require('gulp-wait');
var rimraf       = require('rimraf');

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    server: {
       baseDir: "./app/"
      ,index  : "index.html"
    }
  });
});

// sass
gulp.task('sass', function() {
  gulp.src("./app/**/*.scss")
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle : 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app'))
});

// ブラウザリロード
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task("ejs", function() {
  gulp.src(
     ["app/**/*.ejs",'!' + "app/**/_*.ejs"] //参照するディレクトリ、出力を除外するファイル
  )
  .pipe(ejs())
  .pipe(rename({extname: ".html"})) //拡張子をhtmlに
  .pipe(gulp.dest("app")) //出力先
});

// ESLINT
gulp.task('script', function() {
  gulp.src('./app/js/*.js')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// ディレクトリ削除
gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});

// build
gulp.task('build', ['clean'], function() {
  gulp.src([
    './app/**/*.html',
    './app/**/images/**',
    './app/**/styles/**/*.css',
    './app/**/styles/lib/**',
    './app/**/scripts/**'
  ], {
    base: './app/'
  })
  .pipe(gulp.dest('dist'));
});

// clean-css
gulp.task("min-css", function() {
  gulp.src('./app/**/*.css')
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('public_html'));
});

// uglify
gulp.task("min-js", function() {
  gulp.src('./app/**/*.js')
  .pipe(uglify({
    output: {
      comments: /^!/
    }
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('public_html'));
});

// 監視ファイル
gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch("./app/**/*.scss",['bs-reload', 'sass']);
  gulp.watch("./app/**/*.ejs",['bs-reload', 'ejs']);
  gulp.watch("./app/**/*.html",  ['bs-reload']);
  gulp.watch("./app/**/*.css",  ['bs-reload']);
  gulp.watch("./app/**/*.js",    ['bs-reload']);
});
