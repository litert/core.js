# 类型 IErrorConstructor

该类型描述 LiteRT 异常类型的定义管理器。

## 结构

```ts
interface IErrorHub<M extends {}> {

    /**
     * 定义一种新的异常类型。
     *
     * @param code          新异常类型的唯一数字错误号。
     * @param name          新异常类型的唯一名称。
     * @param message       新异常类型的说明文字。
     */
    define<M2 extends M = M>(
        code: number,
        name: string,
        message: string
    ): IErrorConstructor<M2>;

    /**
     * 获取指定异常的构造器。
     *
     * @param name          异常类型的唯一名称。
     */
    get<M2 extends M = M>(
        name: string
    ): IErrorConstructor<M2>;

    /**
     * 判断一个异常对象是否创建自该异常管理器。
     *
     * @param e     待检查的异常对象。
     * @param id    （可选）根据错误号或者异常名称，校验是否属于特定的异常。
     */
    is<M2 extends M = M>(e: any, id?: string): e is IError<M2>;

    is(e: any, id?: string): e is IError<M>;
}
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。
