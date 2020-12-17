var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var fs = require('fs');

var srcPath = path.join('src')

// find out themes (all directory under src are a theme
var themes = fs.readdirSync(srcPath)

let scssTasks = []
let scssWatchPaths = {}

// for each theme attach scss task
themes.map((theme) => {
    const themeSassTaskName = 'scss_' + theme
    const themeSassWatchPath = './src/' + theme + '/scss/'
    gulp.task(themeSassTaskName, () => {
        return gulp.src(themeSassWatchPath + 'style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('../ecommerce/static/themes/' + theme + '/css/'))
    })
    scssTasks.push(themeSassTaskName)

    scssWatchPaths[theme] = themeSassWatchPath
})


// for each theme attach scss watcher
gulp.task('watch', () => {
    Object.keys(scssWatchPaths).map((theme) => {
        gulp.watch(scssWatchPaths[theme] + '**/**.**', gulp.series('scss_' + theme, (done) => {
            console.log("Build Finished theme " + theme)
            done()
        } ))
    })
})

// by default build all themes
gulp.task('default', gulp.series(scssTasks, (done) => {
    done()
}))