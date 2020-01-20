# 类型 ITimeoutResult

[@litert/observable]: https://github.com/litert/observable.js

> **DEPRECATED：该内容将在 v2.0.0 中移除，请使用 [`@litert/observable`][@litert/observable] 代替。**

该类型描述 TimeoutPromise 对象的超时处理回调的参数类型。

## 结构

```ts
type ITimeoutResult<T, E> = {

    "error": null;

    "value"?: T;

} | {

    "error": E;

    "value": void;
};
```

## 位置

文件 [src/lib/class.TimeoutPromise.ts](../../../src/lib/class.TimeoutPromise.ts)。
