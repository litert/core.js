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
export abstract class Exception {

    protected _errno: number;

    protected _message: string;

    protected _type!: string;

    protected _origin: any;

    public get origin(): any {

        return this._origin;
    }

    public get type(): string {

        return this._type;
    }

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
    public constructor(error: number, message: string, origin?: any) {

        this._errno = error;
        this._message = message;
        this._origin = origin || new Error("TRACE");
    }

    public toString(): string {

        return `Error(${this._type} ${this._errno}): ${this.message}`;
    }

    /**
     * Convert this exception into JSON string.
     */
    public toJSON(): string {

        return JSON.stringify({
            "type": this._type,
            "error": this._errno,
            "message": this._message,
            "origin": this._origin
        });
    }
}
