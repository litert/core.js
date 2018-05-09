/*
   +----------------------------------------------------------------------+
   | LiteRT Core.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2018 Fenying Studio                                    |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/core.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <fenying@litert.org>                          |
   +----------------------------------------------------------------------+
 */

import {
    IPromiseRejector,
    IPromiseResolver
} from "./class.RawPromise";

export class TimeoutPromise<T = any, E = Error> {

    /**
     * The Promise object.
     */
    public promise: Promise<T>;

    private timer!: number;

    /**
     * The Promise rejector method.
     *
     * If this method is called, promise will be REJECTED.
     *
     * If it's already timeont, then do nothing.
     */
    public reject!: IPromiseRejector<E>;

    /**
     * The Promise resolver method.
     *
     * If this method is called, promise will be RESOLVED.
     *
     * If it's already timeont, then do nothing.
     */
    public resolve!: IPromiseResolver<T>;

    public constructor(
        msTimeout: number,
        timeoutError: E
    ) {

        this.promise = new Promise<T>((resolve, reject) => {

            this.timer = setTimeout(() => {

                reject(timeoutError);

                /**
                 * Remove the timer when timeout.
                 */
                delete this.timer;

            }, msTimeout);

            this.resolve = (data: any) => {

                /**
                 * If no timer, it means already timeout, so do nothing.
                 */
                if (!this.timer) {

                    return;
                }

                clearTimeout(this.timer);
                delete this.timer;

                resolve(data);
            };

            this.reject = (error: E) => {

                /**
                 * If no timer, it means already timeout, so do nothing.
                 */
                if (!this.timer) {

                    return;
                }

                clearTimeout(this.timer);
                delete this.timer;

                reject(error);
            };
        });
    }
}
