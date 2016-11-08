# gulp-cedr [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> gulp-cedr - Gulp plugin for a cedr.


## Installation

```sh
$ npm install --save gulp-cedr
```

## Usage

More about [cedr](https://github.com/antitim/cedr).

```js
'use strict'

const cedrlibrary = require('cedr-library');
const сedr = require('gulp-cedr');
const gulp = require('gulp');

let library = {},
  scripts = {},
  styles = {};

gulp.task('library', (callback) => {
  cedrlibrary(['libraries/lib1/'], function(mergedLibrary) {
    library = mergedLibrary;
    let deps = cedr.deps(true, mergedLibrary);
    styles 	= deps.styleFiles;
    scripts = deps.scriptFiles;

    callback(null);
  });
});

gulp.task('pages', ['library'], function() {
  return gulp.src('pages/*.js')
    .pipe(gulpCedr({
      library: library
    }))
    .pipe(gulp.dest('./result/'));
});

gulp.task('css', ['library'], function() {
  return gulp.src(styles)
    .pipe(gulp.dest('./result/css/'))
});

gulp.task('js', ['library'], function() {
  return gulp.src(scripts)
    .pipe(gulp.dest('./result/js/'))
});

gulp.task('default', ['css', 'js', 'pages'], function() {
  console.log('Complete')
});
```
## Options

### library
Type: `Object`

The object of library.



## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/gulp-cedr.svg
[npm-url]: https://npmjs.org/package/gulp-cedr
[travis-image]: https://travis-ci.org/antitim/gulp-cedr.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/gulp-cedr
[daviddm-image]: https://david-dm.org/antitim/gulp-cedr.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/antitim/gulp-cedr
