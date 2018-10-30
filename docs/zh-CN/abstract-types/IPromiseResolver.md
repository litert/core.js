# 类型 IPromiseResolver

该类型描述 Promise 对象的 resolve 操作回调函数的签名。

## 结构

```ts
type IPromiseResolver<T> = (val?: T) => void;
```

## 位置

文件 [src/lib/class.RawPromise.ts](../../../src/lib/class.RawPromise.ts)。
