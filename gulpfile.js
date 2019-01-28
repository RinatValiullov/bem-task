let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let concatcss = require("gulp-concat-css");
let {
    src,
    dest,
    watch,
    series
} = require("gulp");

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

    watch("./common.blocks/**/*.scss", series(sassCompile));
    watch("./common.blocks/button/button.html", {
        events: "change"
    }, browserSync.reload);
}

// Compile sass into CSS & auto-inject into browsers
function sassCompile() {

    let plugins = [
        autoprefixer({
            browsers: ["last 4 versions", "not ie < 11"]
        })
    ]

    return src("./common.blocks/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concatcss('ui.css'))
        .pipe(postcss(plugins))
        .pipe(dest("./common.blocks/button/css/"))
        .pipe(browserSync.stream());
}

exports.browserSyncFunc = browserSyncFunc;
exports.default = series(sassCompile, serve);
