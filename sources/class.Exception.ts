export class Exception {

    protected _errno: number;

    protected _message: string;

    public get error(): number {

        return this._errno;
    }

    public get message(): string {

        return this._message;
    }

    public constructor(error: number, message: string) {

        this._errno = error;
        this._message = message;
    }

    public __toString(): string {

        return `Error(${this._errno}): ${this.message}`;
    }

    public toJSON(): string {

        return JSON.stringify({
            "error": this._errno,
            "message": this._message
        });
    }
}
