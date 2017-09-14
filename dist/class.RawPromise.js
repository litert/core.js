"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RawPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
exports.RawPromise = RawPromise;
//# sourceMappingURL=class.RawPromise.js.map