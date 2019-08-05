# 方法 createErrorHub

该方法用于创建一个新的异常类型定义管理器。

## 声明

```ts
declare const DEFAULT_ERROR_HUB_MODULE = "unknown";

declare function createErrorHub<M extends DefaultMetadataType>(
    moduleName: string = DEFAULT_ERROR_HUB_MODULE
): IErrorHub<M>;
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。

## 示例

[查看源文件。](../../../src/samples/01-errors.ts)
