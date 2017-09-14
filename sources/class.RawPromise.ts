export type IPromiseRejector<E> = (error: E) => void;

export type IPromiseResolver<T> = (val?: T) => void;

export class RawPromise<T = void, E = Error> {

    public reject: IPromiseRejector<E>;

    public resolve: IPromiseResolver<T>;

    public promise: Promise<T>;

    public constructor() {

        this.promise = new Promise<T>((resolve, reject): void => {

            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
