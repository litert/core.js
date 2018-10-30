# 工具方法 Async.sleep

该方法用于休眠一段时间。

注：该方法永远不会失败，因为计时器不会被取消。

## 声明

```ts
declare function sleep(
    ms: number,
    ...args: any[]
): Promise<any[]>;
```

## 位置

文件 [src/lib/utilities.async.ts](../../../src/lib/utilities.async.ts)。

## 示例

[查看源文件。](../../../src/samples/02-async.sleep.ts)

```ts
// File: src/samples/02-async.sleep.ts
import * as Core from "@litert/core";

(async () => {

    console.log(new Date());

    await Core.Async.sleep(1000);

    console.log(new Date());

})();
```
