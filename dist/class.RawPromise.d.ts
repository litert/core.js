/**
 * The signature of Promise rejector method.
 */
export declare type IPromiseRejector<E> = (error: E) => void;
/**
 * The signature of Promise resolver method.
 */
export declare type IPromiseResolver<T> = (val?: T) => void;
/**
 * This class helps simplify the usage of Promise.
 *
 * RawPromise extracts the rejector and resolver methods of a promise, and
 * exposes the Promise object.
 */
export declare class RawPromise<T = void, E = Error> {
    /**
     * The Promise rejector method.
     *
     * If this method is called, promise will be REJECTED.
     */
    reject: IPromiseRejector<E>;
    /**
     * The Promise resolver method.
     *
     * If this method is called, promise will be RESOLVED.
     */
    resolve: IPromiseResolver<T>;
    /**
     * The Promise object.
     */
    promise: Promise<T>;
    constructor();
}
