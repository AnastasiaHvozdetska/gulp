var 	browserSync    = require('browser-sync'),
		del            = require('del'),
		gulp           = require('gulp'),
		autoprefixer   = require('gulp-autoprefixer'),
		cache          = require('gulp-cache'),
		cleanCSS       = require('gulp-clean-css'),
		concat         = require('gulp-concat'),
		imagemin       = require('gulp-imagemin'),
		pngquant	   = require('gulp-pngquant'),
		notify         = require("gulp-notify"),
		sourcemaps 	   = require('gulp-sourcemaps'),
		rename         = require('gulp-rename'),
		rigger 		   = require('gulp-rigger'),
		rsync          = require('gulp-rsync'),
		scss           = require('gulp-sass'),
		uglify         = require('gulp-uglify'),
		gutil          = require('gulp-util' ),	
		ftp            = require('vinyl-ftp'),	
		rimraf 		   = require('rimraf'),
		del            = require('del');
		
var path = {
	build: {
		html: 'build/',
		js:  'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		svg: 'build/img/svg',
		video: 'build/video',
		fonts: 'build/fonts',
		audio: 'build/audio'
	},
	src: {
		html: 'src/*.html',
		js: [
			'src/js/**/*.js'
		],
		style: [
			'src/style/*.scss',
			'src/style/*.css'/* Custom styles */
		],
		img: [
			'src/img/*.jpg',
			'src/img/*.png'
		],
		svg: [
			'src/img/svg/*.svg'
		],
		video: [
			'src/video/*.mp4'
		],
		fonts: [
			'src/fonts/*.ttf',
			'src/fonts/*.otf'
		],
		audio: [
			'src/audio/*.mp3'
		]
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/css/**/*.scss',
		img: 'src/img/*.jpg'
	},
	clean: './build'
}
		
gulp.task('html:build', function() {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.reload({stream: true}));
});	

gulp.task('js:build', function(){
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.reload({stream: true}));
});
		
gulp.task('style:build', function(){
	gulp.src(path.src.style)
		.pipe(scss({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img:build', function(){
	gulp.src(path.src.img)
		.pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('svg:build', function(){
	gulp.src(path.src.svg)
		.pipe(gulp.dest(path.build.svg));
});

gulp.task('video:build', function(){
	gulp.src(path.src.video)
		.pipe(gulp.dest(path.build.video));
});

gulp.task('audio:build', function(){
	gulp.src(path.src.audio)
		.pipe(gulp.dest(path.build.audio));
});

gulp.task('fonts:build', function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});


gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'img:build',
	'svg:build',
	'video:build',
	'fonts:build',
]);


gulp.task('watch', ['style:build', 'js:build', 'html:build', 'browser-sync'], function() {
	gulp.watch('src/style/**/*.scss', ['style:build']);
	gulp.watch('src/js/**/*.js', ['js:build']);
	gulp.watch('src/**/*.html', ['html:build'], browserSync.reload);
	gulp.watch('src/img/*.jpg', ['img:build']);
});




gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});


gulp.task('default', ['watch', 'build', 'browser-sync']);

