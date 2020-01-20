# 工具方法 Async.sleep

该方法用于休眠一段时间。

注：该方法永远不会失败，因为计时器不会被取消。

## 声明

```ts
declare function sleep<T extends any[]>(
    ms: number,
    ...args: T
): Promise<T>;
```

## 位置

文件 [src/lib/utilities.async.ts](../../../src/lib/utilities.async.ts)。

## 示例

[查看源文件。](../../../src/examples/02-async.sleep.ts)

```ts
// File: src/examples/02-async.sleep.ts
import * as Core from "@litert/core";

(async () => {

    console.log(new Date().toISOString());

    /**
     * result 的类型是 [string, number, boolean]
     */
    const result = await Core.Async.sleep(1000, "cc", 123, true);

    console.log(new Date().toISOString());

    for (let i = 0; i < result.length; i++) {

        console.info(`result[${i}] = ${JSON.stringify(result[i])}`);
    }

})();
```
