# 类型 IErrorConstructor

该类型描述 LiteRT 异常对象的构造类结构。

## 结构

```ts
interface IErrorConstructor<M extends {}> {

    /**
     * 异常对象的构造函数。
     */
    new (opts?: {
        message?: string;
        metadata?: M;
    }): IError<M>;

    /**
     * 异常的名称。
     */
    readonly name: string;

    /**
     * 默认的异常描述信息。
     */
    readonly message: string;

    /**
     * 异常的错误号。
     */
    readonly code: number;
}
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。
