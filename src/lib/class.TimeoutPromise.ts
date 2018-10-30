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

import { RawPromise } from "./class.RawPromise";

export type ITimeoutResult<T, E> = {

    "error": null;

    "value"?: T;

} | {

    "error": E;

    "value": void;
};

export type IPromiseTimeoutResultHandler<T, E> = (result: ITimeoutResult<T, E>) => void;

export class TimeoutPromise<T = any, E = Error>
extends RawPromise<T, E> {

    private _timer!: number | null;

    private _msTimeout: number;

    private _timeoutError: E;

    private _handleTimeout!: IPromiseTimeoutResultHandler<T, E>;

    /**
     * The constructor of a timeout-promise.
     *
     * @param msTimeout     The timeout in milliseconds.
     * @param timeoutError  The error object to be thrown if timeout
     * @param autoStart     Start the timer immediately.
     * @param handleTimeout Inject a handler to receiver the result after timeout.
     */
    public constructor(
        msTimeout: number,
        timeoutError: E,
        autoStart: boolean = true,
        handleTimeout?: IPromiseTimeoutResultHandler<T, E>
    ) {

        super();

        this._msTimeout = msTimeout;
        this._timeoutError = timeoutError;

        if (handleTimeout) {

            this._handleTimeout = handleTimeout;
        }

        if (autoStart) {

            this.start();
        }
    }

    /**
     * The Promise rejector method.
     *
     * If this method is called, promise will be REJECTED.
     *
     * If it's already timeont, then do nothing.
     */
    public reject(e: E): void {

        /**
         * If no timer, it means already timeout, so do nothing.
         */
        if (null === this._timer) {

            this._handleTimeout && this._handleTimeout({
                "error": e,
                "value": undefined
            });

            return;
        }

        clearTimeout(this._timer);
        this._timer = null;

        this._reject(e);
    }

    /**
     * The Promise resolver method.
     *
     * If this method is called, promise will be RESOLVED.
     *
     * If it's already timeont, then do nothing.
     */
    public resolve(data?: T): void {

        /**
         * If no timer, it means already timeout, so do nothing.
         */
        if (null === this._timer) {

            this._handleTimeout && this._handleTimeout({
                "error": null,
                "value": data
            });

            return;
        }

        clearTimeout(this._timer);
        this._timer = null;

        this._resolve(data);
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
