# 类型 IError

该类型描述 LiteRT 异常对象的结构。

## 结构

```ts
interface IError<M extends DefaultMetadataType = DefaultMetadataType> {

    /**
     * 异常的错误号。
     */
    readonly code: number;

    /**
     * 异常的名称。
     */
    readonly name: string;

    /**
     * 异常的描述信息。
     */
    readonly message: string;

    /**
     * 异常所在的调用栈信息（原始数据）。
     */
    readonly stack: string;

    /**
     * 异常的元数据信息。
     */
    readonly metadata: M;

    /**
     * 定义该异常的模块名称（而不一定是抛出异常的模块名称）。
     */
    readonly module: string;

    /**
     * 获取异常所在的调用栈信息数组。
     */
    getStackAsArray(): string[];

    /**
     * 格式化为字符串。
     */
    toString(): string;

    /**
     * 转换为纯数据对象，方便 JSON 格式化。
     */
    toJSON(withStack?: false): IErrorData<M>;

    /**
     * 转换为纯数据对象，方便 JSON 格式化。
     *
     * @param {boolean} withStack 设置为 true 时，结果里包含异常的调用栈信息。
     */
    toJSON(withStack: true): IErrorFullData<M>;
}
```

## 位置

文件 [src/lib/Error.ts](../../../src/lib/Error.ts)。
