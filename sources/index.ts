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
 * The template type of dictionary.
 */
export interface IDictionary<T> {

    [key: string]: T;
}

export type ClassDecorator = (target: Function) => void;

export type MethodDecorator = (
    target: Object, property: string | symbol
) => void;

export * from "./class.Exception";

export * from "./class.RawPromise";
