/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule requestAnimationFramePolyfill
 */

'use strict';

var emptyFunction = require('./emptyFunction');
var nativeRequestAnimationFrame = require('./nativeRequestAnimationFrame');

var lastTime = 0;

/**
 * Here is the native and polyfill version of requestAnimationFrame.
 * Please don't use it directly and use requestAnimationFrame module instead.
 */
var requestAnimationFrame = nativeRequestAnimationFrame || function (callback) {
  debugger
  var currTime = Date.now();
  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
  lastTime = currTime + timeDelay;
  return global.setTimeout(function () {
    callback(Date.now());
  }, timeDelay);
};

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFrame(emptyFunction);

module.exports = requestAnimationFrame;