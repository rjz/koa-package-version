# koa-package-version

A middleware for surfacing the package.json version of [koa][koa] applications.

Usage
-------------------------------------------------------------------------------

Install via npm:

    $ npm install --save koa-package-version

Include in the app:

    app.use(require('koa-package-version')({
      url    : '/package-version',
      format : 'serving @ %s'
    }));

#### Options:

  * `url` (optional) - the url to serve the version from (default: `/version`)

  * `format` (optional) - a format string for wrapping the version in text /
    HTML responses

License
-------------------------------------------------------------------------------

MIT

[koa]: https://github.com/koajs/koa

