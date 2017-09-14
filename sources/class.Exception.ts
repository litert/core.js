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

/**
 * This class provides the default exception class for LiteRT.
 */
export class Exception {

    protected _errno: number;

    protected _message: string;

    /**
     * The code to identify the type of this exception.
     */
    public get error(): number {

        return this._errno;
    }

    /**
     * The description about this exception.
     */
    public get message(): string {

        return this._message;
    }

    /**
     * Constructor of an exception.
     *
     * @param error The code to identify the type of this exception.
     * @param message The description about this exception.
     */
    public constructor(error: number, message: string) {

        this._errno = error;
        this._message = message;
    }

    public __toString(): string {

        return `Error(${this._errno}): ${this.message}`;
    }

    /**
     * Convert this exception into JSON string.
     */
    public toJSON(): string {

        return JSON.stringify({
            "error": this._errno,
            "message": this._message
        });
    }
}
