#!/usr/bin/env node

'use strict';

var minimist = require('minimist');
var vx     = require('../');

new vx.Kernel(minimist(process.argv.slice(2))).run();

