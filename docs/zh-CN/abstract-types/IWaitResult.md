# 类型 IWaitResult

该类型描述 `Async.multiTasks` 方法的返回值。

## 结构

```ts
type IWaitResult<T, E> = {

    success: true;

    result: T;

} | {

    success: false;

    result: E;
};
```

## 位置

文件 [src/lib/utilities.async.ts](../../../src/lib/utilities.async.ts)。
