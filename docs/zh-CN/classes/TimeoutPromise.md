# 类 TimeoutPromise

该类提供一个具有超时功能的 Promise 工具类，且能够将 resolve 和 reject 从回调中提取
出来，变成一个对象使用。

## 结构

```ts
declare class TimeoutPromise<T = void, E = Error> {

    /**
     * Promise 对象的 reject 回调。
     */
    public reject!: IPromiseRejector<E>;

    /**
     * Promise 对象的 resolve 回调。
     */
    public resolve!: IPromiseResolver<T>;

    /**
     * Promise 对象。
     */
    public promise: Promise<T>;

    /**
     * The constructor of a timeout-promise.
     *
     * @param msTimeout     超时时间（毫秒）
     * @param timeoutError  超时的时候，被传递给 reject 的异常对象
     * @param autoStart     是否立即启动超时计时器
     * @param handleTimeout 超时后，用于接收 resolve/reject 结果的回调。
     */
    public constructor(
        msTimeout: number,
        timeoutError: E,
        autoStart: boolean = true,
        handleTimeout?: IPromiseTimeoutResultHandler<T, E>
    ) {}

    /**
     * 启动超时计时器。
     */
    public start(): void {}
}
```

## 位置

文件 [src/lib/class.TimeoutPromise.ts](../../../src/lib/class.TimeoutPromise.ts)。

## 示例

[查看源文件。](../../../src/samples/04-class.TimeoutPromise.ts)
