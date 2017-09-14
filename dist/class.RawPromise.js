"use strict";
/*
   +----------------------------------------------------------------------+
   | LiteRT Core.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2007-2017 Fenying Studio                               |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/core.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <i.am.x.fenying@gmail.com>                    |
   +----------------------------------------------------------------------+
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class helps simplify the usage of Promise.
 *
 * RawPromise extracts the rejector and resolver methods of a promise, and
 * exposes the Promise object.
 */
class RawPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
exports.RawPromise = RawPromise;
//# sourceMappingURL=class.RawPromise.js.map