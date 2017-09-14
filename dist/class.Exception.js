"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception {
    get error() {
        return this._errno;
    }
    get message() {
        return this._message;
    }
    constructor(error, message) {
        this._errno = error;
        this._message = message;
    }
    __toString() {
        return `Error(${this._errno}): ${this.message}`;
    }
    toJSON() {
        return JSON.stringify({
            "error": this._errno,
            "message": this._message
        });
    }
}
exports.Exception = Exception;
//# sourceMappingURL=class.Exception.js.map