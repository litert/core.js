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

export type DefaultMetadataType = Record<string, any>;

/**
 * Describe the basic information of an error.
 */
export interface IErrorData<M extends DefaultMetadataType> {

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

    /**
     * The metadata of error.
     */
    metadata: M;

    /**
     * The name of module thats emit this error.
     */
    module: string;
}

/**
 * Describe the full information of an error.
 */
export interface IErrorFullData<M extends DefaultMetadataType> extends IErrorData<M> {

    /**
     * The calling-stack of the position where the error occurred.
     */
    stack: string[];
}

/**
 * The LiteRT standard error objects.
 */
export interface IError<M extends DefaultMetadataType = DefaultMetadataType> {

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
     * The metadata of error.
     */
    readonly metadata: M;

    /**
     * The name of module thats emit this error.
     */
    readonly module: string;

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
    toJSON(withStack?: false): IErrorData<M>;

    toJSON(withStack: true): IErrorFullData<M>;
}

interface IBaseError {

    new (
        code: number,
        name: string,
        message: string,
        metadata?: DefaultMetadataType,
        moduleName?: string
    ): IError<DefaultMetadataType>;

    name: string;

    message: string;

    code: number;
}

/**
 * The constructor of error objects.
 */
export interface IErrorConstructor<M extends DefaultMetadataType> {

    /**
     * The constructor of the objects of the error.
     */
    new (opts?: {
        message?: string;
        metadata?: M;
    }): IError<M>;

    /**
     * The name of the error.
     */
    readonly name: string;

    /**
     * The default description of the error.
     */
    readonly message: string;

    /**
     * The code of the error.
     */
    readonly code: number;

    /**
     * The name of module thats emit this error.
     */
    readonly module: string;

    /**
     * The default value of metadata.
     */
    readonly defaultMetadata: M;
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
    },
    "metadata": {
        "writable": false,
        "configurable": false,
        "value": metadata || {}
    },
    "module": {
        "writable": false,
        "configurable": false,
        "value": moduleName
    },
    "defaultMetadata": {
        "writable": false,
        "configurable": false,
        "value": {}
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
        "code", "name", "message", "metadata", "moduleName", THE_CONSTRUCTOR
    );

    ret.prototype.getStackAsArray = function(this: IError<DefaultMetadataType>): string[] {

        return this.stack.split(/\n\s+at /).slice(1);
    };

    ret.prototype.toJSON = function(
        this: IError<DefaultMetadataType>,
        withStack?: boolean
    ): IErrorFullData<DefaultMetadataType> | IErrorData<DefaultMetadataType> {

        return withStack ? {
            "code": this.code,
            "message": this.message,
            "metadata": this.metadata,
            "module": this.module,
            "name": this.name,
            "stack": this.getStackAsArray()
        } : {
            "code": this.code,
            "message": this.message,
            "metadata": this.metadata,
            "module": this.module,
            "name": this.name
        };
    };

    ret.prototype.toString = function(this: IError<DefaultMetadataType>): string {

        return `Error ${this.code} (${this.name}): ${this.message}
  Call Stack:
    ${this.getStackAsArray().join("\n    ")}`;
    };

    return ret;
})();

/**
 * A hub of errors, is a collection and factory of error types.
 *
 * Every hub has a standalone namespace of error types.
 */
export interface IErrorHub<M extends DefaultMetadataType> {

    /**
     * The name of module thats emit this error.
     */
    readonly module: string;

    /**
     * Define a new error type.
     *
     * @param code          The unique numeric-identity for the new error type.
     *                      The code is generated automatically if set to null.
     * @param name          The unique string-identity for the new error type.
     * @param message       The description for the new error type.
     */
    define<M2 extends M = M>(
        code: number | null,
        name: string,
        message: string,
        metadata?: M2
    ): IErrorConstructor<M2>;

    /**
     * Get the error constructor by its name .
     *
     * @param name  The string-identity for the error type.
     */
    get<M2 extends M = M>(
        name: string
    ): IErrorConstructor<M2>;

    /**
     * Check if an error belongs to an error type defined in this hub.
     *
     * @param e     The error to be checked.
     * @param id    The name or code of error type to be checked.
     */
    is<M2 extends M = M>(e: any, id?: string | number): e is IError<M2>;

    /**
     * Check if an error belongs to an error type defined in this hub.
     *
     * @param e     The error to be checked.
     * @param id    The name or code of error type to be checked.
     */
    is(e: any, id?: string | number): e is IError<M>;
}

let DEFAULT_HUB: IErrorHub<Record<string, any>>;

class ErrorHub<M extends DefaultMetadataType>
implements IErrorHub<M> {

    private _errors: Record<string, IErrorConstructor<any>>;

    private _baseError: IBaseError;

    private _counter: number;

    private _module: string;

    public constructor(moduleName: string) {

        this._counter = 0;

        this._errors = {};

        this._module = moduleName;

        this._baseError = (Function(
            "BaseError", `class __ extends BaseError {
    constructor(code, name, message, metadata, moduleName) {
        super(
            code,
            name,
            message,
            metadata,
            moduleName
        );
    };
}
return __;`
        ))(BaseError, this._module) as any;
    }

    public get module(): string {

        return this._module;
    }

    public is(e: any, id?: string | number): e is IError<M> {

        if (typeof id !== "undefined") {

            return (!!this._errors[id]) && (e instanceof this._errors[id]);
        }
        else {

            return e instanceof this._baseError;
        }
    }

    public define<M2 extends M>(
        code: number | null,
        name: string,
        message: string,
        metadata?: M2
    ): IErrorConstructor<M2> {

        if (!/^[a-z]\w+$/i.test(name)) {

            const TheError = DEFAULT_HUB.get("INVALID_ERROR_NAME");

            throw new TheError({
                message: `Invalid name ${JSON.stringify(name)} for error definition.`
            });
        }

        if (code === null) {

            code = this._counter++;
        }
        else if (!Number.isSafeInteger(code)) {

            const TheError = DEFAULT_HUB.get("INVALID_ERROR_CODE");

            throw new TheError({
                message: `Invalid code ${JSON.stringify(code)} for error definition.`
            });
        }
        else {

            this._counter = code;
        }

        if (this._errors[name]) {

            const TheError = DEFAULT_HUB.get("DUPLICATED_ERROR_NAME");

            throw new TheError({
                message: `The name ${JSON.stringify(name)} of new error already exists.`
            });
        }

        if (this._errors[code]) {

            const TheError = DEFAULT_HUB.get("DUPLICATED_ERROR_CODE");

            throw new TheError({
                message: `The code ${JSON.stringify(code)} of new error already exists.`
            });
        }

        return this._errors[code] = this._errors[name] = (Function(
            "BaseError", "metadata", `class ${name} extends BaseError {
    constructor(opts = {}) {
        super(
            ${code},
            ${JSON.stringify(name)},
            opts.message || ${JSON.stringify(message)},
            { ...metadata, ...opts.metadata },
            ${JSON.stringify(this._module)}
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
    "message": {
        "writable": false,
        "configurable": false,
        "value": ${JSON.stringify(message)}
    },
    "module": {
        "writable": false,
        "configurable": false,
        "value": ${JSON.stringify(this._module)}
    },
    "defaultMetadata": {
        "writable": false,
        "configurable": false,
        "value": metadata || {}
    }
});

return ${name};`
        ))(this._baseError, metadata) as any;
    }

    public get<M2 extends M>(
        name: string
    ): IErrorConstructor<M2> {

        return this._errors[name];
    }
}

/**
 * The default name for module of errors, if omitted.
 */
export const DEFAULT_ERROR_HUB_MODULE = "unknown";

/**
 * Create a new error hub that has a standalone namespace of error types.
 */
export function createErrorHub<M extends DefaultMetadataType>(
    moduleName: string = DEFAULT_ERROR_HUB_MODULE
): IErrorHub<M> {

    return new ErrorHub<M>(moduleName);
}

DEFAULT_HUB = createErrorHub<DefaultMetadataType>("@litert/core");

DEFAULT_HUB.define(
    null,
    "INVALID_ERROR_NAME",
    `Invalid name for error definition.`
);

DEFAULT_HUB.define(
    null,
    "INVALID_ERROR_CODE",
    `Invalid code for error definition.`
);

DEFAULT_HUB.define(
    null,
    "DUPLICATED_ERROR_NAME",
    `The name of new error already exists.`
);

DEFAULT_HUB.define(
    null,
    "DUPLICATED_ERROR_CODE",
    `The code of new error already exists.`
);

/**
 * Get the default hub of errors.
 */
export function getDefaultErrorHub(): IErrorHub<DefaultMetadataType> {

    return DEFAULT_HUB;
}

/**
 * Check if an object is a LiteRT error object.
 *
 * @param e The error object to be identified.
 */
export function isError<
    M extends DefaultMetadataType = DefaultMetadataType
>(e: any): e is IError<M> {

    return e instanceof BaseError;
}
