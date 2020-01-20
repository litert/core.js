# 类 RawPromise

[@litert/observable]: https://github.com/litert/observable.js

> **DEPRECATED：该内容将在 v2.0.0 中移除，请使用 [`@litert/observable`][@litert/observable] 代替。**

该类提供一个简单的 Promise 工具类，能够将 resolve 和 reject 从回调中提取
出来，变成一个对象使用。

## 结构

```ts
declare class RawPromise<T = void, E = Error> {

    /**
     * Promise 对象的 reject 回调。
     */
    public reject!: IPromiseRejector<E>;

    /**
     * Promise 对象的 resolve 回调。
     */
    public resolve!: IPromiseResolver<T>;

    /**
     * Promise 对象。
     */
    public promise: Promise<T>;

    public constructor() {}
}
```

## 示例

```ts
import * as fs from "fs";
import { RawPromise } from "@litert/core";

function fileExists(path: string): Promise<boolean> {

    const ret = new RawPromise<boolean, Error>();

    fs.exists(path, function(r): void {

        ret.resolve(r);
    });

    return ret.promise;
}
```

## 位置

文件 [src/lib/class.RawPromise.ts](../../../src/lib/class.RawPromise.ts)。
