export declare class Exception {
    protected _errno: number;
    protected _message: string;
    readonly error: number;
    readonly message: string;
    constructor(error: number, message: string);
    __toString(): string;
    toJSON(): string;
}
