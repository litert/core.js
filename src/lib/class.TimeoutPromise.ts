/**
 * Copyright 2020 Angus.Fenying <fenying@litert.org>
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

import { RawPromise, IPromiseRejector, IPromiseResolver } from './class.RawPromise';

export type ITimeoutResult<T, E> = {

    'error': null;

    'value'?: T;

} | {

    'error': E;

    'value': void;
};

export type IPromiseTimeoutResultHandler<T, E> = (result: ITimeoutResult<T, E>) => void;

/**
 * A promise controllation with timeout.
 *
 * @deprecated Use `@litert/observable` instead. And this class will be removed in v2.0.0 version.
 */
export class TimeoutPromise<T = any, E = Error>
    extends RawPromise<T, E> {

    private _timer!: number | null;

    private _msTimeout: number;

    private _timeoutError: E;

    private _handleTimeout!: IPromiseTimeoutResultHandler<T, E>;

    private _reject: IPromiseRejector<E>;

    private _resolve: IPromiseResolver<T>;

    /**
     * The constructor of a timeout-promise.
     *
     * @param msTimeout     The timeout in milliseconds.
     * @param timeoutError  The error object to be thrown if timeout
     * @param autoStart     Start the timer immediately.
     * @param handleTimeout Inject a handler to receiver the result after timeout.
     *
     * @deprecated Use `@litert/observable` instead. And this class will be removed in v2.0.0 version.
     */
    public constructor(
        msTimeout: number,
        timeoutError: E,
        autoStart: boolean = true,
        handleTimeout?: IPromiseTimeoutResultHandler<T, E>
    ) {

        super();

        this._reject = this.reject;
        this._resolve = this.resolve;

        this._msTimeout = msTimeout;
        this._timeoutError = timeoutError;

        if (handleTimeout) {

            this._handleTimeout = handleTimeout;
        }

        this._initMethods();

        if (autoStart) {

            this.start();
        }
    }

    private _initMethods(): void {

        this.reject = (e: E): void => {

            /**
             * If no timer, it means already timeout, so do nothing.
             */
            if (null === this._timer) {

                this._handleTimeout && this._handleTimeout({
                    'error': e,
                    'value': undefined
                });

                return;
            }

            clearTimeout(this._timer);
            this._timer = null;

            this._reject(e);
        };

        this.resolve = (data?: T): void => {

            /**
             * If no timer, it means already timeout, so do nothing.
             */
            if (null === this._timer) {

                this._handleTimeout && this._handleTimeout({
                    'error': null,
                    'value': data
                });

                return;
            }

            clearTimeout(this._timer);
            this._timer = null;

            this._resolve(data);
        };
    }

    /**
     * Start the timer.
     */
    public start(): void {

        if (undefined === this._timer) {

            this._timer = setTimeout(() => {

                this._reject(this._timeoutError);

                /**
                 * Remove the timer when timeout.
                 */
                this._timer = null;

            }, this._msTimeout) as any;
        }
    }
}
