const gulp = require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
//notice the import of the new plugins
const nodemon = require("nodemon");
const livereload = require("gulp-livereload");

gulp.task("js", function () {
	gulp
		.src("src/js/*.js")
		.pipe(concat("all.js"))
		.pipe(minify())
		.pipe(gulp.dest("public/js"));
});

gulp.task("sass", function () {
	gulp
	.src("src/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("public/css"))
	.pipe(cleanCSS())
	.pipe(concat("main.min.css"))
	.pipe(gulp.dest("public/css"));
});

// optimize images
gulp.task("img", function () {
	gulp
		.src("src/img/*")
		.pipe(imagemin())		
		.pipe(gulp.dest("public/img"));
});

gulp.task("watch", function () {
	// refresh the browser whenever any of our frontend files change
	gulp.watch("src/js/*.js", ["js", "refresh"]);
	gulp.watch("src/scss/*.scss", ["sass", "refresh"]);
	gulp.watch("*.html", ["refresh"]);
});

//refresh task - refreshes the browser
gulp.task("refresh", function () {
	livereload.reload();
});

//server task - responsilbe for running our express server
gulp.task("server", function () {
	livereload.listen(); //start listening for changes

	nodemon({
		script: "server.js",
		//nodemon should only restart the server when `server.js` changes so we ignore the rest:
		ignore: [
			"index.html",
			"package.json",
			"gulpfile.js",
			"src/js/*.js",
			"public"
		]
	}).on("restart", function () {
		livereload.reload(); //on server restart, refresh the browser
	});
});

gulp.task("start", ["server", "img", "watch"]);