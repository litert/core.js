# 类型 IErrorData

该类型描述 LiteRT 异常对象的纯数据结构。

## 结构

```ts
interface IErrorData<M extends DefaultMetadataType> {

    /**
     * 异常的错误号。
     */
    code: number;

    /**
     * 异常的名称。
     */
    name: string;

    /**
     * 异常的描述信息。
     */
    message: string;

    /**
     * 异常的元数据信息。
     */
    metadata: M;

    /**
     * 定义该异常的模块名称（而不一定是抛出异常的模块名称）。
     */
    module: string;
}
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。
