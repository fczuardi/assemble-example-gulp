'use strict';
var mkdirp = require('mkdirp'),
    gulp = require('gulp'),
    assemble = require('gulp-assemble');

var paths = {
        sources: {
            layouts: 'src/templates/layouts/',
            partials: 'src/templates/partials/',
            pages: 'src/templates/pages/',
            data: 'src/data/'
        },
        build: {
            www: 'dist/www/'
        }
    };

gulp.task('assemble', function(){
    var options = {
        layoutdir: paths.sources.layouts,
        // the following line shouldnt be needed
        layout: 'html_page.hbs', //default layout
        partials: paths.sources.partials + '*.hbs',
        data: paths.sources.data,
        log: {
            level: 'verbose' // verbose, debug, info, warning, error, critical
        }
    };
    gulp.src(paths.sources.pages + '*.hbs')
        .pipe(assemble('something-here-is-required', options))
        .pipe(gulp.dest(paths.build.www));
});

gulp.task('createBuildDir', function(){
    mkdirp(paths.build.www, function(err) {
        if(err){ throw err; }
    });
});

gulp.task('default', ['createBuildDir','assemble']);