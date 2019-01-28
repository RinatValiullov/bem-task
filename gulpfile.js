const { src, dest, watch, series } = require("gulp");
let sass = require("gulp-sass");

let browserSync = require("browser-sync").create();

function browserSyncFunc() {
  browserSync.init({
    server: {
      baseDir: "./common.blocks/button/"
    },
    notify: false
  });
}

// Static Server + watching scss/html files
function serve() {
  browserSyncFunc();

  watch("./common.blocks/button/**/*.scss", series(sassCompile));
  watch(
    "./common.blocks/button/**/*.html",
    { events: "change" },
    browserSync.reload
  );
}

// Compile sass into CSS & auto-inject into browsers
function sassCompile() {
  return src("./common.blocks/button/**/*.scss")
    .pipe(sass())
    .pipe(dest("./common.blocks/button/css/"))
    .pipe(browserSync.stream());
}

exports.browserSyncFunc = browserSyncFunc;
exports.default = series(sassCompile, serve);
