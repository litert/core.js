/**
 * This class provides the default exception class for LiteRT.
 */
export declare class Exception {
    protected _errno: number;
    protected _message: string;
    /**
     * The code to identify the type of this exception.
     */
    readonly error: number;
    /**
     * The description about this exception.
     */
    readonly message: string;
    /**
     * Constructor of an exception.
     *
     * @param error The code to identify the type of this exception.
     * @param message The description about this exception.
     */
    constructor(error: number, message: string);
    __toString(): string;
    /**
     * Convert this exception into JSON string.
     */
    toJSON(): string;
}
