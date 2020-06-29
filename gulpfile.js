var gulp 					= require("gulp"),
	browserSync				= require("browser-sync"),
	// cssNano					= require("cssnano"),
	sass						= require("gulp-sass"),
	plumber					= require("gulp-plumber"),
	gutil						= require("gulp-util"),
	uglifyJs	    			= require("gulp-uglify-es").default,
	rename					= require("gulp-rename"),
	pug						= require("gulp-pug"),	
	concat					= require("gulp-concat"),
	del 						= require("del");

// Source code paths, build destination, other vars

var paths = {

				cwd: './dist',

				pug: {
					watch: 'src/**/*.pug',
					src: 'src/*.pug',
					dest: './dist'
				},

				styles: {
					watch: 'src/**/*.+(sass|scss)',
					src:   'src/sass/main.sass',
					dest:  'dist/css/'
				}, 

				js: {
					src: 'src/scripts/*.js',
					dest: 'dist/scripts'
				},

				jsUglify: {
					src: ['src/js/*.js', '!app/js/*.min.js'],
					dest: 'dist/js'
				}

}



gulp.task('server', () => {
	browserSync.init({
		server: paths.cwd,
		notify: false,
	});
});


gulp.task('clean:all', () => {
	return del('dist/*');
});


gulp.task('pug', (cb) => {
	gulp.src(paths.pug.src)
 	 .pipe(plumber(function (error) {
		gutil.log(error.message);
		this.emit('end');
	 }))
	 .pipe(pug({
		pretty: true,
	 }))
	 .pipe(gulp.dest(paths.pug.dest))
	 .pipe(browserSync.reload({ stream: true }));
	 cb();
})	

gulp.task('sass', () => {
	return gulp.src(paths.styles.src)
		   .pipe(plumber(function(error) {
		   	gutil.log(error.message);
		   	this.emit('end');
		   }))
		   .pipe(sass())
		   .pipe(gulp.dest(paths.styles.dest))
		   .pipe(browserSync.reload({stream:true}))
});



gulp.task('copy', function () {
	 return  gulp.src(paths.js.src)
	 		  .pipe(gulp.dest(paths.js.dest));
})

gulp.task('uglify', function() {
	return gulp.src(paths.jsUglify.src)
		   .pipe(uglifyJs())
		   .on('error', function (err) {
				console.error('Error in js task', err.toString());
			})
		   .pipe(rename(function(path) {
			   path.basename += ".min"
		   }))
		   .pipe(gulp.dest('src/js/'))
		   .pipe(browserSync.reload({ stream: true }));
})

gulp.task('compress', gulp.series('uglify', () => {
	return gulp.src(['js/*.min.js', '!js/all.min.js'])
		   .pipe(concat('all.min.js'))
		   .pipe(gulp.dest(paths.js.dest))
}));


// gulp.task('build_jquery', function () {
// 	return gulp.src('app/bower_components/jquery/dist/jquery.js')
// 		.pipe(concat('jquery.min.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('app/js'))
// 		.pipe(browserSync.reload({ stream: true }));
// })


function reloadHTML(cb) {
		browserSync.reload();
		cb();
}



gulp.task('watch', gulp.parallel('server', function () {
	 gulp.watch(paths.styles.watch, gulp.series('sass'));
	 gulp.watch(paths.js.src, gulp.series('copy', reloadHTML));
	 gulp.watch(paths.pug.watch, gulp.series('pug', reloadHTML));
 	//  gulp.watch('app/bower_components/jquery/dist/jquery.js', gulp.series('build_jquery'));
 	//  gulp.watch(paths.styles.dest, reloadHTML)
}));


gulp.task('default', gulp.series(
	'clean:all', 
	'sass', 
	'copy', 
	'pug', 
	'watch'
	));