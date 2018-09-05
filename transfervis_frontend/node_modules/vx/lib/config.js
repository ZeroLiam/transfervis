'use strict';

var Rconf = require('vx-conf');
var path  = require('path');

module.exports = Config;

/**
 * @constructor
 */
function Config(argv) {
  this.argv = argv;
}

/**
 * Current working directory. This will typically be the path from which
 * Vx was instantiated.
 * @property {string} cwd Absolute filesystem path
 * @default
 */
Config.prototype.cwd = process.cwd();

/**
 * Default values
 * @property {object} defaults Default config values
 * @default
 */
Config.prototype.defaults = require(path.resolve(__dirname, '..', '.vxrc'));

/**
 * Build configuration by parsing available inputs
 * @param {string} startPath The starting path to parse from. Can be a file or folder.
 */
Config.prototype.ctx = function (startPath) {
  var ctx = this.createCtx(startPath);

  ctx.clone = this.createCtx.bind(this);

  return ctx;
};

/**
 * Create a configuration
 * @param {string} startPath The starting path to parse from. Can be a file or folder.
 */
Config.prototype.createCtx = function (startPath) {
  var relativeTo = startPath || this.cwd;

  var ctx = new Rconf();

  ctx.addStore({
    provider: 'literal',
    data: this.defaults
  });

  ctx.addStore({
    provider: 'file',
    filename: '.vxrc',
    cwd: relativeTo
  });

  ctx.addStore({
    provider: 'env'
  });

  ctx.addStore({
    provider: 'argv'
  });

  return ctx;
};
