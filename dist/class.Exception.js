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
 * This class provides the default exception class for LiteRT.
 */
class Exception {
    get type() {
        return this._type;
    }
    /**
     * The code to identify the type of this exception.
     */
    get error() {
        return this._errno;
    }
    /**
     * The description about this exception.
     */
    get message() {
        return this._message;
    }
    /**
     * Constructor of an exception.
     *
     * @param error The code to identify the type of this exception.
     * @param message The description about this exception.
     */
    constructor(error, message) {
        this._errno = error;
        this._message = message;
    }
    __toString() {
        return `Error(${this._type} ${this._errno}): ${this.message}`;
    }
    /**
     * Convert this exception into JSON string.
     */
    toJSON() {
        return JSON.stringify({
            "type": this._type,
            "error": this._errno,
            "message": this._message
        });
    }
}
exports.Exception = Exception;
//# sourceMappingURL=class.Exception.js.map