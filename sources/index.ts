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
 * The template type of dictionary.
 */
export interface Dict<T> {

    [key: string]: T;
}

/**
 * The template type of dictionary.
 *
 * @deprecated Use `Dict` instead. This will be removed in v1.0.0.
 */
export type IDictionary<T> = Dict<T>;

/**
 * Semantically stressing an nullable type.
 */
export type Nullable<T> = T | null;

/**
 * Semantically stressing an optional type.
 */
export type Optional<T> = T | undefined;

/**
 * The signature of decorator for classes.
 */
export type ClassDecorator = (target: Function) => void;

/**
 * The signature of decorator for methods.
 */
export type MethodDecorator = (
    target: Object, property: string | symbol
) => void;

export * from "./class.Exception";

export * from "./class.RawPromise";

export * from "./class.TimeoutPromise";

import * as Async from "./utilities.async";

import * as Validators from "./utilities.validators";

export { Async, Validators };
