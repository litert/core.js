/**
 * Copyright 2018 Angus.Fenying
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    public reject!: IPromiseRejector<E>;

    /**
     * The Promise resolver method.
     *
     * If this method is called, promise will be RESOLVED.
     */
    public resolve!: IPromiseResolver<T>;

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
