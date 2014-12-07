var fs = require('fs'),
    path = require('path'),
    util = require('util');

'use strict';

// version is available in the environment for apps running under `npm start`
function versionFromEnv () {
  if (process.env.hasOwnProperty('npm_package_version')) {
    return process.env.npm_package_version;
  }
}

// check npm search paths for a dir containing `package.json`
function versionFromFile () {
  var paths = require.main.paths.map(function (dir) {
    return path.join(path.dirname(dir), 'package.json');
  });

  var packageFile = paths.find(fs.existsSync);

  if (packageFile) {
    return require(packageFile).version;
  }
}

module.exports = function (opts) {

  var formatString, versionString, versionUrl;

  var version = versionFromEnv() || versionFromFile();

  opts || (opts = {});

  if (version) {
    formatString = opts.formatString || 'version: %s';
    versionString = util.format(formatString, version);
  }
  else {
    process.stderr.write('Error reading package.json\n');
  }

  versionUrl = opts.url || '/version';

  return function * packageVersion (next) {
    if (version && this.method === 'GET' && this.url === versionUrl) {
      switch (this.accepts(['json', 'html', 'text'])) {
        case 'json':
          this.body = { version: version };
          break;
        case 'text':
        case 'html':
          this.body = versionString;
          break;
        default: this.throw(406);
      }
    }
    else {
      yield next;
    }
  }
};

