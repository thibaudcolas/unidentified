import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import browserify from 'browserify';
import browserifyInc from 'browserify-incremental';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

const isProduction = process.env.NODE_ENV === 'production';
const bs = browserSync.create('main');
const browserifyInstance = isProduction ? browserify : browserifyInc;

const bundler = browserifyInstance({
    cache: {},
    transform: [babelify],
    packageCache: {},
    debug: !isProduction,
    fullPaths: !isProduction,
});

const pleeeaseOptions = {
    minifier: isProduction,
    sourcemaps: false,
    mqpacker: false,
    filters: true,
    rem: true,
    pseudoElements: true,
    opacity: true,
    autoprefixer: {
        browsers: ['> 1%', 'Explorer >= 8'],
    },
};

gulp.task('css', () => {
    return gulp.src(path.join('src', 'styles', 'main.scss'))
        .pipe(isProduction ? gutil.noop() : sourcemaps.init())
        .pipe(sass())
        .on('error', function onError(err) {
            gutil.log(err.message);
            bs.notify(err.message, 10000);
            this.emit('end');
        })
        .pipe(pleeease(pleeeaseOptions))
        .pipe(isProduction ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest(path.join('public')))
        .pipe(bs.stream());
});

bundler.add(path.resolve('src', 'main.js'));

gulp.task('js', () => {
    return bundler.bundle()
        .on('error', function onError(err) {
            gutil.log(err.message);
            bs.notify(err.message, 10000);
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(isProduction ? uglify() : gutil.noop())
        .pipe(gulp.dest(path.join('public')))
        .pipe(bs.stream());
});

gulp.task('watch', ['js', 'css'], () => {
    bs.init({
        notify: false,
        open: true,
        proxy: 'localhost:3000',
    });

    const justReload = [
        path.join('src', '*.html'),
    ];

    gulp.watch(justReload, bs.reload);
    gulp.watch(path.join('src', 'styles', '**', '*.scss'), ['css']);
    gulp.watch(path.join('src', '**', '*.js'), ['js']);
});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
