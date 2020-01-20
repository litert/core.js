# 方法 isError

该方法用于判断一个对象是否为 LiteRT 的异常对象。

## 声明

```ts
declare function isError<
    M extends DefaultMetadataType = DefaultMetadataType
>(e: any): e is IError<M>;
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。

## 示例

[查看源文件。](../../../src/examples/01-errors.ts)
