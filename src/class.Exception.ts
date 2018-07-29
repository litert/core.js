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
 * This class provides the default exception class for LiteRT.
 *
 * @deprecated Use new Error system instead. This class will be removed in
 * v1.0.0.
 */
export abstract class Exception {

    protected _errno: number;

    protected _message: string;

    protected _type!: string;

    protected _origin: any;

    protected _trace: string[];

    /**
     * The data needs to be carried by exception.
     */
    public get origin(): any {

        return this._origin;
    }

    /**
     * The trace of Exception.
     *
     * This is an array contains the calling stacks from the new operation of
     * an exception.
     */
    public get trace(): string[] {

        return this._trace;
    }

    /**
     * The type of the exception.
     */
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
     * @param origin The data needs to be carried by exception.
     */
    public constructor(error: number, message: string, origin?: any) {

        this._errno = error;
        this._message = message;
        this._origin = origin;
        this._trace = (new Error().stack as string).split(/\s+at\s+/).slice(3);

        /**
         * this._type should be defined in the sub classes.
         */
    }

    /**
     * @override
     */
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
            "origin": this._origin,
            "trace": this._trace
        });
    }

    /**
     * THe method helps determine if an error object is of LiteRT's exception.
     *
     * @param e     The error object to be check.
     * @param type  The type of exception to be ensured.
     */
    public static is(e: any, type?: string): e is Exception {

        return e && (
            e instanceof Exception || (
                typeof e._type === "string" &&
                typeof e._error === "number" &&
                typeof e._message === "string" &&
                typeof e._trace === "object"
            )
        ) && (type === void 0 || type === e.type);
    }
}
