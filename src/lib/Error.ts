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

/* eslint-disable @typescript-eslint/no-explicit-any */
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
     * The other code of this error.
     */
    aliasCodes: number[];

    /**
     * The string-code of an error, as the name, used to identify the type or
     * the reason of the error.
     */
    name: string;

    /**
     * The other names of this error.
     */
    aliases: string[];

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
     * The other code of this error.
     */
    readonly aliasCodes: number[];

    /**
     * The string-code of an error, as the name, used to identify the type or
     * the reason of the error.
     */
    readonly name: string;

    /**
     * The other names of this error.
     */
    readonly aliases: string[];

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

    /**
     * Emit as a warning.
     */
    warn(): this;
}

interface IBaseError {

    new (
        code: number,
        name: string,
        message: string,
        metadata?: DefaultMetadataType,
        moduleName?: string
    ): IError;

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
        metadata?: Partial<M>;
    }): IError<M>;

    /**
     * The name of the error.
     */
    readonly name: string;

    /**
     * The other names of this error.
     */
    readonly aliases: string[];

    /**
     * The default description of the error.
     */
    readonly message: string;

    /**
     * The code of the error.
     */
    readonly code: number;

    /**
     * The other code of this error.
     */
    readonly aliasCodes: number[];

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
    },
    "aliasCodes": {
        "writable": false,
        "configurable": false,
        "value": aliasCodes
    },
    "aliases": {
        "writable": false,
        "configurable": false,
        "value": aliases
    }
});
`;

    if ('captureStackTrace' in Error) {

        THE_CONSTRUCTOR += 'Error.captureStackTrace(this, this.constructor);';
    }
    else {

        THE_CONSTRUCTOR += `Object.defineProperty(
            this,
            "stack",
            new Error().stack
        );`;
    }

    let ret = Function(
        'code',
        'name',
        'message',
        'metadata',
        'moduleName',
        'aliasCodes',
        'aliases',
        THE_CONSTRUCTOR
    );

    ret.prototype.getStackAsArray = function(this: IError): string[] {

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return this.stack.split(/\n\s+at /).slice(1);
    };

    ret.prototype.toJSON = function(
        this: IError,
        withStack?: boolean
    ): IErrorFullData<DefaultMetadataType> | IErrorData<DefaultMetadataType> {

        return withStack ? {
            'code': this.code,
            'aliasCodes': this.aliasCodes,
            'message': this.message,
            'metadata': this.metadata,
            'module': this.module,
            'name': this.name,
            'aliases': this.aliases,
            'stack': this.getStackAsArray()
        } : {
            'code': this.code,
            'aliasCodes': this.aliasCodes,
            'message': this.message,
            'metadata': this.metadata,
            'module': this.module,
            'aliases': this.aliases,
            'name': this.name
        };
    };

    ret.prototype.toString = function(this: IError): string {

        return `Error #${this.code} (${this.name} from ${this.module}): ${this.message}
  Call Stack:
    ${this.getStackAsArray().join('\n    ')}`;
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
     * @param metadata      The metadata of this new error.
     * @param aliasCodes    The alias codes of this new error.
     * @param aliases       The alias names of this new error.
     */
    define<M2 extends M = M>(
        code: number | null,
        name: string,
        message: string,
        metadata: M2,
        aliasCodes?: number[],
        aliases?: string[]
    ): IErrorConstructor<M2>;

    /**
     * Get the error constructor by its name or code.
     *
     * @param identity  The string-identity or code-identity for the error type.
     */
    get<M2 extends M = M>(
        identity: string | number
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

    /**
     * Emit a warning.
     *
     * @param e     The details of warning.
     */
    warn(e: IError): this;

    /**
     * Force throwing warnings as errors.
     *
     * @param enabled   Set to true to force throwing warnings as exceptions. [Default: true]
     */
    forceWarningAsError(enabled?: boolean): this;

    /**
     * Add a new listener callback for warnings.
     *
     * @param key       The key of listener.
     * @param listener  The callback of listener.
     */
    addWarningListener(key: string, listener: (e: IError) => void): this;

    /**
     * Remove an existing listener by key.
     *
     * @param key       The key of listener.
     */
    removeWarningListener(key: string): this;
}

let DEFAULT_HUB: IErrorHub<Record<string, any>>;

interface IErrorHubPrivateData {

    errors: Record<string, IErrorConstructor<any>>;

    baseError: IBaseError;

    counter: number;

    module: string;

    warningListeners: Record<string, (e: IError) => void>;

    warningAsError: boolean;
}

const HUB_SECRETS = new WeakMap<any, IErrorHubPrivateData>();

class ErrorHub<M extends DefaultMetadataType>
implements IErrorHub<M> {

    public constructor(moduleName: string) {

        HUB_SECRETS.set(this, {
            warningListeners: {},
            warningAsError: false,
            counter: 0,
            errors: {},
            module: moduleName,
            baseError: (Function(
                'BaseError', `class __ extends BaseError {
        constructor(code, name, message, metadata, moduleName, aliasCodes, aliases) {
            super(
                code,
                name,
                message,
                metadata,
                moduleName,
                aliasCodes,
                aliases
            );
        };
    }
    return __;`
            ))(BaseError, moduleName)
        });
    }

    public removeWarningListener(key: string): this {

        delete (HUB_SECRETS.get(this) as IErrorHubPrivateData).warningListeners[key];

        return this;
    }

    public addWarningListener(key: string, callback: (e: IError) => void): this {

        const _this = HUB_SECRETS.get(this) as IErrorHubPrivateData;

        if (_this.warningListeners[key]) {

            const TheError = DEFAULT_HUB.get('DUPLICATED_WARNING_LISTENER');

            throw new TheError({
                message: `Duplicated key of warning listener: ${JSON.stringify(name)}.`
            });
        }

        _this.warningListeners[key] = callback;

        return this;
    }

    public forceWarningAsError(enabled: boolean = true): this {

        (HUB_SECRETS.get(this) as IErrorHubPrivateData).warningAsError = enabled;

        return this;
    }

    public warn(e: IError): this {

        const _this = HUB_SECRETS.get(this) as IErrorHubPrivateData;

        if (_this.warningAsError) {

            throw e;
        }

        for (const k in _this.warningListeners) {

            _this.warningListeners[k](e);
        }

        return this;
    }

    public get module(): string {

        return (HUB_SECRETS.get(this) as IErrorHubPrivateData).module;
    }

    public is(e: any, id?: string | number): e is IError<M> {

        const _this = HUB_SECRETS.get(this) as IErrorHubPrivateData;

        if (typeof id !== 'undefined') {

            return (!!_this.errors[id]) && (e instanceof _this.errors[id]);
        }
        else {

            return e instanceof _this.baseError;
        }
    }

    public define<M2 extends M>(
        code: number | null,
        name: string,
        message: string,
        metadata?: M2,
        aliasCodes: number[] = [],
        aliases: string[] = []
    ): IErrorConstructor<M2> {

        const _this = HUB_SECRETS.get(this) as IErrorHubPrivateData;

        if (!/^[a-z]\w+$/i.test(name)) {

            const TheError = DEFAULT_HUB.get('INVALID_ERROR_NAME');

            throw new TheError({
                message: `Invalid name ${JSON.stringify(name)} for error definition.`
            });
        }

        if (code === null) {

            code = _this.counter++;
        }
        else if (!Number.isSafeInteger(code)) {

            const TheError = DEFAULT_HUB.get('INVALID_ERROR_CODE');

            throw new TheError({
                message: `Invalid code ${JSON.stringify(code)} for error definition.`
            });
        }
        else {

            _this.counter = code;
        }

        if (_this.errors[name]) {

            const TheError = DEFAULT_HUB.get('DUPLICATED_ERROR_NAME');

            throw new TheError({
                message: `The name ${JSON.stringify(name)} of new error already exists.`
            });
        }

        if (aliases.length) {

            for (const alias of aliases) {

                if (_this.errors[alias]) {

                    const TheError = DEFAULT_HUB.get('DUPLICATED_ERROR_NAME');

                    throw new TheError({
                        message: `The name ${JSON.stringify(alias)} of new error already exists.`
                    });
                }
            }
        }

        if (_this.errors[code]) {

            const TheError = DEFAULT_HUB.get('DUPLICATED_ERROR_CODE');

            throw new TheError({
                message: `The code ${JSON.stringify(code)} of new error already exists.`
            });
        }

        if (aliasCodes.length) {

            for (const alias of aliasCodes) {

                if (_this.errors[alias]) {

                    const TheError = DEFAULT_HUB.get('DUPLICATED_ERROR_CODE');

                    throw new TheError({
                        message: `The code ${JSON.stringify(alias)} of new error already exists.`
                    });
                }
            }
        }

        _this.errors[code] = _this.errors[name] = (Function(
            'BaseError', 'metadata', 'hub', `class ${name} extends BaseError {
    constructor(opts = {}) {
        super(
            ${code},
            ${JSON.stringify(name)},
            opts.message || ${JSON.stringify(message)},
            { ...metadata, ...opts.metadata },
            ${JSON.stringify(_this.module)},
            ${JSON.stringify(aliasCodes)},
            ${JSON.stringify(aliases)}
        );
    };
    warn() {

        hub.warn(this);

        return this;
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
        "value": ${JSON.stringify(_this.module)}
    },
    "aliases": {
        "writable": false,
        "configurable": false,
        "value": ${JSON.stringify(aliases)}
    },
    "aliasCodes": {
        "writable": false,
        "configurable": false,
        "value": ${JSON.stringify(aliasCodes)}
    },
    "defaultMetadata": {
        "writable": false,
        "configurable": false,
        "value": metadata || {}
    }
});

return ${name};`
        ))(_this.baseError, metadata, this);

        if (aliasCodes) {

            for (const alias of aliasCodes) {

                _this.errors[alias] = _this.errors[code];
            }
        }

        if (aliases) {

            for (const alias of aliases) {

                _this.errors[alias] = _this.errors[code];
            }
        }

        return _this.errors[code];
    }

    public get<M2 extends M>(
        name: string
    ): IErrorConstructor<M2> {

        return (HUB_SECRETS.get(this) as IErrorHubPrivateData).errors[name];
    }
}

/**
 * The default name for module of errors, if omitted.
 */
export const DEFAULT_ERROR_HUB_MODULE = 'unknown';

export const DEFAULT_WARNING_LISTENER_KEY = 'litert:errors:hub:default-warning-listener';

export const DEFAULT_WARNING_LISTENER = function(e: IError): void {

    console.warn(`WARNING: A warning was emitted, and it may become an error in the future versions.
${e}`);
};

/**
 * Create a new error hub that has a standalone namespace of error types.
 */
export function createErrorHub<M extends DefaultMetadataType>(
    moduleName: string = DEFAULT_ERROR_HUB_MODULE
): IErrorHub<M> {

    return new ErrorHub<M>(moduleName).addWarningListener(
        DEFAULT_WARNING_LISTENER_KEY,
        DEFAULT_WARNING_LISTENER
    );
}

DEFAULT_HUB = createErrorHub<DefaultMetadataType>('@litert/core');

DEFAULT_HUB.define(
    null,
    'INVALID_ERROR_NAME',
    'Invalid name for error definition.',
    {}
);

DEFAULT_HUB.define(
    null,
    'INVALID_ERROR_CODE',
    'Invalid code for error definition.',
    {}
);

DEFAULT_HUB.define(
    null,
    'DUPLICATED_ERROR_NAME',
    'The name of new error already exists.',
    {}
);

DEFAULT_HUB.define(
    null,
    'DUPLICATED_ERROR_CODE',
    'The code of new error already exists.',
    {}
);

DEFAULT_HUB.define(
    null,
    'DUPLICATED_WARNING_LISTENER',
    'The key of warning listener already exists.',
    {}
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
>(e: unknown): e is IError<M> {

    return e instanceof BaseError;
}
