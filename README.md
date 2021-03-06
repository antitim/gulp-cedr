# gulp-cedr [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> gulp-cedr - Gulp plugin for a cedr.


## Installation

```sh
$ npm install --save gulp-cedr
```

## Usage

More about [cedr](https://github.com/antitim/cedr).

More about [cedr-library](https://github.com/antitim/cedr-library).

More about [cedr-deps](https://github.com/antitim/cedr-deps).

```js
'use strict'

const cedrlibrary	= require('cedr-library');
const cedrDeps		= require('cedr-deps');
const cedr			= require('gulp-cedr');
const gulp 			= require('gulp');

let library = {},
	scripts = {},
	styles = {};

gulp.task('library', (callback) => {
	cedrlibrary(['libraries/antitim-lib/'], function(mergedLibrary) {
		library = mergedLibrary;
		let deps = cedrDeps(true, mergedLibrary);
		styles 	= deps.style;
		scripts = deps.script;

		callback(null);
	});
});

gulp.task('pages', ['library'], function() {
	return gulp.src('pages/*.js')
		.pipe(сedr({
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

### include and extend

JS files containing pages run in one context while forming the html. 
On this basis, to use include or extend, you can use the following construction:

#### _helpers.js
```js
function layout(content_1) {
	return {
		block: 'page',
		content: [
			{ block: 'header' },
			content_1,
			{ block: 'footer' }
		]
	}
}

function menu() {
	return {
		block: 'menu',
		content: [
			{ 
				block: 'menu',
				element: 'item'
			}
		]
	}
}

```

#### page.js
```js
layout([
	{
		block: 'breadcrumbs'
	},
	menu()
	...
])
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
