/**
 * Copyright 2018 Angus.Fenying
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The template type of dictionary.
 *
 * @deprecated Duplicated, use `Record` instead. This will be removed in v1.0.0.
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
 *
 * @deprecated Useless. This will be removed in v1.0.0.
 */
export type Optional<T> = T | undefined;

/**
 * The signature of decorator for classes.
 *
 * @deprecated Duplicated. This will be removed in v1.0.0.
 */
export type ClassDecorator = (target: Function) => void;

/**
 * The signature of decorator for methods.
 *
 * @deprecated Duplicated. This will be removed in v1.0.0.
 */
export type MethodDecorator = (
    target: Object, property: string | symbol
) => void;

export * from "./class.Exception";

export * from "./class.RawPromise";

export * from "./class.TimeoutPromise";

export * from "./Error";

import * as Async from "./utilities.async";

import * as Validators from "./utilities.validators";

export { Async, Validators };
