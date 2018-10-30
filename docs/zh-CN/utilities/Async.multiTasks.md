# 工具方法 Async.multiTasks

该方法用于等待多个 Promise 对象，直到所有的 Promise 对象都被 resolve 或者 reject。

## 声明

```ts
declare function multiTasks<T, E>(
    tasks: Array<Promise<T>>
): Promise<Array<IWaitResult<T, E>>>;
```

## 位置

文件 [src/lib/utilities.async.ts](../../../src/lib/utilities.async.ts)。

## 示例

[查看源文件。](../../../src/samples/03-async.multiTasks.ts)

```ts
// File: src/samples/03-async.multiTasks.ts
import * as Core from "@litert/core";

async function makePromise(ms: number): Promise<number> {

    await Core.Async.sleep(ms);

    const ret = Math.floor(Math.random() * 10);

    if (ret >= 5) {

        return ret;
    }

    throw new Error("Failed.");
}

(async () => {

    const result = await Core.Async.multiTasks(
        Array(10).fill(0).map(
            (x) => Math.floor(Math.random() * 1000)
        ).map(makePromise)
    );

    console.log(JSON.stringify(result, null, 2));

})();
```
