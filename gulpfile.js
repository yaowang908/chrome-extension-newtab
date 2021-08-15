const gulp = require('gulp')
const jeditor = require("gulp-json-editor");

gulp.task('default', () => {
    return gulp
      .src("./src/manifest.json")
      .pipe(
        jeditor({
          version: process.env.npm_package_version,
          description: process.env.npm_package_description,
        })
      )
      .pipe(gulp.dest("./buffer"));
});