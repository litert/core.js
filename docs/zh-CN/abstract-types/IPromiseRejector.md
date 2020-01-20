# 类型 IPromiseRejector

[@litert/observable]: https://github.com/litert/observable.js

> **DEPRECATED：该内容将在 v2.0.0 中移除，请使用 [`@litert/observable`][@litert/observable] 代替。**

该类型描述 Promise 对象的 reject 操作回调函数的签名。

## 结构

```ts
type IPromiseRejector<E> = (error: E) => void;
```

## 位置

文件 [src/lib/class.RawPromise.ts](../../../src/lib/class.RawPromise.ts)。
