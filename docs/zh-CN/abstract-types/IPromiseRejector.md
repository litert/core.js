# 类型 IPromiseRejector

该类型描述 Promise 对象的 reject 操作回调函数的签名。

## 结构

```ts
type IPromiseRejector<E> = (error: E) => void;
```

## 位置

文件 [src/lib/class.RawPromise.ts](../../../src/lib/class.RawPromise.ts)。
