export declare type IPromiseRejector<E> = (error: E) => void;
export declare type IPromiseResolver<T> = (val?: T) => void;
export declare class RawPromise<T = void, E = Error> {
    reject: IPromiseRejector<E>;
    resolve: IPromiseResolver<T>;
    promise: Promise<T>;
    constructor();
}
