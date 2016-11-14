'use strict';

const gutil = require('gulp-util');
const through = require('through2');
const cedr = require('cedr');

module.exports = (options) => {
  let opts = Object.assign({}, options);
  let library = opts.library || {};
  let evalContext = {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-cedr', 'Streaming not supported'));
      return;
    }

    if (file.isBuffer()) {
      let pageJs = eval.call(evalContext, file.contents.toString());
      let html = cedr(pageJs, library);

      if (html !== '') {
        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, '.html');
        this.push(file);
      }
    }

    cb();
  });
};
