/**
 * Gulp Configuration
 */

'use strict'

var gulp = require('gulp')
var pkg = require('./package.json')
var path = require('path')

var dirs = {
  build: path.join(__dirname, '/build'),
  src: path.join(__dirname, '/src'),
  cloud: path.join(__dirname, '/cloud')
}

/**
 * Static files
 */
gulp.task('static', function copyStaticFilesToBuild () {
  return gulp.src(dirs.src + '/static/**/*').pipe(gulp.dest(dirs.build))
})

/**
 * CSS
 */
gulp.task('css', function compileSass () {
  var sass = require('gulp-sass')(require('sass'))
  var autoprefixer = require('gulp-autoprefixer')
  var sourcemaps = require('gulp-sourcemaps')

  return gulp.src([
    dirs.src + '/css/**/*.scss',
    '!' + dirs.src + '/css/_*',
    '!' + dirs.src + '/css/_*/**'
  ])
  .pipe(sourcemaps.init())
  .pipe(sass.sync({
    style: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(sourcemaps.write('./', {
    addComment: true,
    includeContent: true
  }))
  .pipe(gulp.dest(dirs.build + '/css'))
})

/**
 * HTML
 */
gulp.task('html', function compilePug () {
  var pug = require('gulp-pug')

  return gulp.src([
    dirs.src + '/html/**/*.pug',
    '!' + dirs.src + '/html/_*',
    '!' + dirs.src + '/html/_*/**'
  ])
  .pipe(pug({
    pretty: true,
    locals: require(dirs.src + '/html/_pug/locals.js')
  }))
  .pipe(gulp.dest(dirs.build))
})

/**
 * JS
 */
gulp.task('js', function minifyJs () {
  var rename = require('gulp-rename')
  var sourcemaps = require('gulp-sourcemaps')
  var uglify = require('gulp-uglify')
  var header = require('gulp-header')
  var banner =
        '/** \n' +
        ' * <%= pkg.name %> - <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @license <%= pkg.license %>\n' +
        ' */\n\n'

  return gulp.src([
    dirs.src + '/js/**/*.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(header(banner, {pkg: pkg}))
  .pipe(rename(function (path) {
    path.extname = '.min.js'
  }))
  .pipe(uglify({
    mangle: true,
    compress: true
  }))
  .pipe(sourcemaps.write('./', {
    addComment: true,
    includeContent: true
  }))
  .pipe(gulp.dest(dirs.build + '/js'))
})

/**
 * Resize base images to create needed sizes
 */
gulp.task('img:generate:projectThumbnails', function createImageThumbnails () {
  var rename = require('gulp-rename')
  var imageResize = require('gulp-image-resize')
  return gulp.src([
    dirs.cloud + '/img/originals/projects/**/*.jpg',
    dirs.cloud + '/img/originals/projects/**/*.png'
  ])
  .pipe(rename(function (path) {
    path.basename = path.basename.replace(/\s/g, '_').toLowerCase()
  }))
  .pipe(imageResize({
    // width: 2000,
    height: 1100,
    crop: false,
    upscale: false,
    quality: 1,
    imageMagick: true
  }))
  .pipe(gulp.dest(dirs.build + '/img/thumbs/projects'))
})
gulp.task('img:generate:bio', function createImageThumbnails () {
  var imageResize = require('gulp-image-resize')
  return gulp.src(dirs.cloud + '/img/originals/bio/bio.jpg')
    .pipe(imageResize({
      width: 1200,
      crop: false,
      upscale: false,
      quality: 1,
      imageMagick: true
    }))
    .pipe(gulp.dest(dirs.build + '/img/'))
})
gulp.task('img:generate:cover', function copyImageCoverToBuild () {
  var imageResize = require('gulp-image-resize')
  return gulp.src(dirs.cloud + '/img/front_page.jpg')
  .pipe(imageResize({
    // width: 3500,
    height: 1100,
    crop: false,
    upscale: false,
    quality: 1,
    imageMagick: true
  }))
  .pipe(gulp.dest(dirs.build + '/img'))
})
gulp.task('img:copy:projectOriginals', function copyImageOriginalsToBuild () {
  var rename = require('gulp-rename')
  return gulp.src([
    dirs.cloud + '/img/originals/projects/**/*.jpg',
    dirs.cloud + '/img/originals/projects/**/*.png'
  ])
  .pipe(rename(function (path) {
    path.basename = path.basename.replace(/\s/g, '_').toLowerCase()
  }))
  .pipe(gulp.dest(dirs.build + '/img/originals/projects/'))
})
gulp.task('img:copy:linkPreview', function copyImageOriginalsToBuild () {
  return gulp.src([
    dirs.cloud + '/img/link_preview.jpg'
  ])
  .pipe(gulp.dest(dirs.build + '/img/'))
})
gulp.task('img', gulp.parallel(
  'img:copy:projectOriginals',
  'img:generate:cover',
  'img:generate:projectThumbnails',
  'img:generate:bio',
  'img:copy:linkPreview'
))

gulp.task('build', gulp.parallel('css', 'html', 'js', 'static'))

gulp.task('watch', gulp.series('build', function watchChangesToAutoBuild () {
  return gulp.watch(dirs.src + '/**/*', gulp.parallel('build'))
}))

/**
 * Builds website and then deploys result to gitub pages branch
 */
gulp.task('publishCurrentBuild', function deployToGithubPages (done) {
  var ghPages = require('gh-pages')
  ghPages.publish(dirs.build, {
    force: true
  }, done)
})
gulp.task('deploy', gulp.series(gulp.parallel('build', 'img'), 'publishCurrentBuild'))

var externalIp = '120.0.0.1'
gulp.task('resolveIp', function (done) {
  var getIP = require('external-ip')()
  getIP(function (err, ip) {
    if (err) {
      done(err)
    } else {
      externalIp = ip
      console.log('External IP: ' + externalIp)
      done()
    }
  })
})

/**
 * Demo server. Basic static express app pointing to the build folder
 */
gulp.task('demo', gulp.series('resolveIp', function runLocalDemo (done) {
  var express = require('express')
  var http = require('http')
  var morgan = require('morgan')

  var port = 5000

  var app = express()
  app.use(morgan('dev'))
  app.use('/', express.static(dirs.build))
  app.get('/', function (req, res) {
    res.redirect('/index.html')
  })

  var server = http.createServer(app)
  server.on('error', function (error) {
    console.log('Server error!', error)
    done(error)
  })
  server.on('listening', function () {
    console.log('Express app hosting static directory ', dirs.build)
    console.log('Listening on localhost ' + port)
    console.log('Externally Accessible @ http://' + externalIp + ':' + port)
    console.log('Locally Accessible @ http://localhost:' + port)
    done()
  })
  server.listen(port)
}))

gulp.task('default', gulp.series('build'))
