import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import sourcemaps from 'gulp-sourcemaps';

const isProduction = process.env.NODE_ENV === 'production';

const bs = browserSync.create('main');

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
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(pleeease(pleeeaseOptions))
        .pipe(sourcemaps.write())
        .on('error', (err) => {
            console.log(err.message);
            bs.notify(err.message, 10000);
            this.emit('end');
        })
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
    gulp.watch(path.join('src', 'js', '**', '*.js'), ['js']);
});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
