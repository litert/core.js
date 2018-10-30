# 类型 IErrorFullData

该类型描述 LiteRT 异常对象的纯数据结构（含堆栈信息）。

## 结构

```ts
interface interface IErrorFullData<M extends {}> extends IErrorData<M> {

    /**
     * 异常所在的调用栈信息。
     */
    stack: string[];
}
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。
