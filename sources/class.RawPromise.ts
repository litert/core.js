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
 * The signature of Promise rejector method.
 */
export type IPromiseRejector<E> = (error: E) => void;

/**
 * The signature of Promise resolver method.
 */
export type IPromiseResolver<T> = (val?: T) => void;

/**
 * This class helps simplify the usage of Promise.
 *
 * RawPromise extracts the rejector and resolver methods of a promise, and
 * exposes the Promise object.
 */
export class RawPromise<T = void, E = Error> {

    /**
     * The Promise rejector method.
     *
     * If this method is called, promise will be REJECTED.
     */
    public reject: IPromiseRejector<E>;

    /**
     * The Promise resolver method.
     *
     * If this method is called, promise will be RESOLVED.
     */
    public resolve: IPromiseResolver<T>;

    /**
     * The Promise object.
     */
    public promise: Promise<T>;

    public constructor() {

        this.promise = new Promise<T>((resolve, reject): void => {

            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
