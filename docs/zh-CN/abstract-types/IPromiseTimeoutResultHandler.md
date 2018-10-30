# 类型 IPromiseTimeoutResultHandler

该类型描述 TimeoutPromise 对象的超时处理回调的签名。

## 结构

```ts
type IPromiseTimeoutResultHandler<T, E> = (result: ITimeoutResult<T, E>) => void;
```

## 位置

文件 [src/lib/class.TimeoutPromise.ts](../../../src/lib/class.TimeoutPromise.ts)。
