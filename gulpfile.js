var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		concat       = require('gulp-concat'),
		//uglify       = require('gulp-uglify-es').default,
		cleancss     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rsync        = require('gulp-rsync'),
		newer        = require('gulp-newer'),
		rename       = require("gulp-rename"),
		responsive   = require('gulp-responsive'),
		del          = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }))
	.pipe(concat("styles.min.css"))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([/*
		'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
		'app/libs/jquery-easing/jquery.easing.min.js',
		'app/libs/scroll2id/jquery.malihu.PageScroll2id.min.js', //Scrolling menu
		'app/libs/easypiechart/jquery.easypiechart.js', 
		'node_modules/mixitup/dist/mixitup.js', //Mixitup
		'app/libs/magnific-popup/jquery.magnific-popup.js', //Magnific pop-up
		'app/js/_custom.js', // Custom scripts. Always at the end*/
		'app/js/my_validate.js',
		'app/js/script.js',

		])
	.pipe(concat('scripts.min.js'))
	//.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

//Удалила 2 нижних таска, т.к не смогла разобрать, как их применить к фоновым картинкам
// Чтобы их вернуть, нужно скопровать код из первоисточника https://github.com/agragregra/OptimizedHTML-5

// Responsive Images

// Clean @*x IMG's


// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function() {
	return gulp.src('app/')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/_custom.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	//gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

//gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));
gulp.task('default', gulp.parallel( 'styles', 'scripts', 'browser-sync', 'watch'));


