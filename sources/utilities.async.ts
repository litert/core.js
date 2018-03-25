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

/**
 * Sleep for determined time and then wake up.
 *
 * NOTE: This method SHOULD never fail because timer wouldn't be cancelled.
 *
 * @param ms Milliseconds to wait
 * @param args The result of promise resolved.
 */
export function sleep(
    ms: number,
    ...args: any[]
): Promise<any[]> {

    return new Promise<any[]>((resolve) => setTimeout(resolve, ms, args));
}
