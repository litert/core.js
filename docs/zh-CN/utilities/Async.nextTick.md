# 工具方法 Async.nextTick

该方法等价于 `setImmediate`。

## 声明

```ts
declare function nextTick<T extends any[]>(
    fn: (...args: T) => void,
    ...args: T
): void;
```

## 位置

文件 [src/lib/utilities.async.ts](../../../src/lib/utilities.async.ts)。

## 示例

[查看源文件。](../../../src/samples/05-async.nextTick.ts)

```ts
// File: src/samples/05-async.nextTick.ts

import * as Core from "@litert/core";

Core.Async.nextTick(function(a: string): void {

    console.log(a);

}, "world");

console.log("hello");
```
