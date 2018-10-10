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
 * Describe the basic information of an error.
 */
export interface IErrorPayload {

    /**
     * The numeric-code of an error, used to identify the type or the reason
     * of the error.
     */
    code: number;

    /**
     * The string-code of an error, as the name, used to identify the type or
     * the reason of the error.
     */
    name: string;

    /**
     * The detail description of an error, used to describe the details of the
     * error.
     */
    message: string;
}

export interface IErrorData extends IErrorPayload {

    /**
     * The calling-stack of the position where the error occurred.
     */
    stack: string[];
}

export interface IError {

    /**
     * The numeric-code of an error, used to identify the type or the reason
     * of the error.
     */
    readonly code: number;

    /**
     * The string-code of an error, as the name, used to identify the type or
     * the reason of the error.
     */
    readonly name: string;

    /**
     * The detail description of an error, used to describe the details of the
     * error.
     */
    readonly message: string;

    /**
     * The calling-stack of the position where the error occurred.
     */
    readonly stack: string;

    /**
     * Get the calling-stack as a string array.
     */
    getStackAsArray(): string[];

    /**
     * Stringify the error to be printable.
     */
    toString(): string;

    /**
     * Convert to a raw data object that could be stringified as JSON.
     */
    toJSON(withStack?: false): IErrorPayload;
    toJSON(withStack: true): IErrorData;
}

interface IBaseError {

    new (
        code: number,
        name: string,
        message: string
    ): IError;

    name: string;

    message: string;

    code: number;
}

export interface IErrorConstructor {

    new (
        message?: string
    ): IError;

    name: string;

    message: string;

    code: number;
}

const BaseError: IBaseError = (function(): any {

    let THE_CONSTRUCTOR: string = `
let stackArray = [];
Object.defineProperties(this, {
    "name": {
        "writable": false,
        "configurable": false,
        "value": name
    },
    "code": {
        "writable": false,
        "configurable": false,
        "value": code
    },
    "message": {
        "writable": false,
        "configurable": false,
        "value": message
    }
});
`;

    if ("captureStackTrace" in Error) {

        THE_CONSTRUCTOR += `Error.captureStackTrace(this, this.constructor);`;
    }
    else {

        THE_CONSTRUCTOR += `Object.defineProperty(
            this,
            "stack",
            new Error().stack
        );`;
    }

    let ret = Function(
        "code", "name", "message", THE_CONSTRUCTOR
    );

    ret.prototype.getStackAsArray = function(this: IError): string[] {

        return this.stack.split(/\n\s+at /).slice(1);
    };

    ret.prototype.toJSON = function(
        this: IError,
        withStack?: boolean
    ): IErrorData | IErrorPayload {

        return withStack ? {
            "name": this.name,
            "code": this.code,
            "message": this.message,
            "stack": this.getStackAsArray()
        } : {
            "name": this.name,
            "code": this.code,
            "message": this.message
        };
    };

    ret.prototype.toString = function(this: IError): string {

        return `Error ${this.code} (${this.name}): ${this.message}
  Call Stack:
    ${this.getStackAsArray().join("\n    ")}`;
    };

    return ret;
})();

export interface IErrorHub {

    /**
     * Define a new error type.
     *
     * @param code      The unique numeric-identity for the new error type.
     * @param name      The unique string-identity for the new error type.
     * @param message   The description for the new error type.
     */
    define(code: number, name: string, message: string): IErrorConstructor;

    /**
     * Get the error constructor by its name .
     *
     * @param name  The string-identity for the error type.
     */
    get(name: string): IErrorConstructor;

    /**
     * Check if an error belongs to an error type defined in this hub.
     *
     * @param e     The error to be checked.
     * @param id    The name or code of error type to be checked.
     */
    is(e: IError, id?: string): boolean;
}

class ErrorHub
implements IErrorHub {

    private _errors: Record<string, IErrorConstructor>;

    private _baseError: IBaseError;

    public constructor() {

        this._errors = {};

        this._baseError = (Function(
            "BaseError", `class __ extends BaseError {
    constructor(code, name, message) {
        super(
            code,
            name,
            message
        );
    };
}
return __;`
        ))(BaseError) as any;
    }

    public is(e: IError, id?: string | number): boolean {

        if (id) {

            return (!!this._errors[id]) && (e instanceof this._errors[id]);
        }
        else {

            return e instanceof this._baseError;
        }
    }

    public define(code: number, name: string, message: string): IErrorConstructor {

        if (!/^[a-z]\w+$/i.test(name)) {

            throw new BaseError(
                1,
                "INVALID_ERROR_NAME",
                `Invalid name "${name}" for error definition.`
            );
        }

        if (!Number.isSafeInteger(code)) {

            throw new BaseError(
                2,
                "INVALID_ERROR_CODE",
                `Invalid code ${JSON.stringify(code)} for error definition.`
            );
        }

        if (this._errors[name]) {

            throw new BaseError(
                3,
                "DUPLICATED_ERROR_NAME",
                `The name ${JSON.stringify(name)} of new error is duplicated.`
            );
        }

        if (this._errors[code]) {

            throw new BaseError(
                4,
                "DUPLICATED_ERROR_CODE",
                `The code ${JSON.stringify(code)} of new error is duplicated.`
            );
        }

        return this._errors[code] = this._errors[name] = (Function(
            "BaseError", `class ${name} extends BaseError {
    constructor(message) {
        super(
            ${code},
            ${JSON.stringify(name)},
            message || ${JSON.stringify(message)}
        );
    };
}

Object.defineProperties(${name}, {
    "name": {
        "writable": false,
        "configurable": false,
        "value": "${name}"
    },
    "code": {
        "writable": false,
        "configurable": false,
        "value": ${code}
    },
    "code": {
        "writable": false,
        "configurable": false,
        "value": ${JSON.stringify(message)}
    }
});

return ${name};`
        ))(this._baseError) as any;
    }

    public get(name: string): IErrorConstructor {

        return this._errors[name];
    }
}

export function createErrorHub(): IErrorHub {

    return new ErrorHub();
}

const DEFAULT_HUB = createErrorHub();

export function getDefaultErrorHub(): IErrorHub {

    return DEFAULT_HUB;
}

export function isError(e: any): e is IError {

    return e instanceof BaseError;
}