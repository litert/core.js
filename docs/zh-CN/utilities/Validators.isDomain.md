# 工具方法 Validators.isDomain

该方法用于检测一个输入的字符串是否为合法的域名格式。

检测条件：

1. 长度为 1 ~ 255 字符；
2. 符合以下正则表达式：

    ```regexp
    /^[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i
    ```

## 声明

```ts
declare function isDomain(domain: string): boolean;
```

## 位置

文件 [src/lib/utilities.validators.ts](../../../src/lib/utilities.validators.ts)。

## 示例

[查看源文件。](../../../src/examples/06-validators.isDomain.ts)

```ts
// File: src/examples/06-validators.isDomain.ts

import * as Core from "@litert/core";

if (Core.Validators.isDomain("www.google.com")) {

    console.info(`Yes`);
}
else {

    console.info(`No`);
}
```
