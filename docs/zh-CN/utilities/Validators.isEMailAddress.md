# 工具方法 Validators.isEMailAddress

该方法用于检测一个输入的字符串是否为合法的邮件格式。

检测条件：

1. 长度为 1 ~ 255 字符；
2. 是否不包含 `..` 和 `.@`。
3. 符合以下正则表达式：

    ```regexp
    /^[-+_a-z0-9][-+_\.a-z0-9]{0,62}@[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i
    ```

## 声明

```ts
declare function isEMailAddress(email: string): boolean;
```

## 位置

文件 [src/lib/utilities.validators.ts](../../../src/lib/utilities.validators.ts)。

## 示例

[查看源文件。](../../../src/samples/06-validators.isEMailAddress.ts)

```ts
// File: src/samples/06-validators.isEMailAddress.ts

import * as Core from "@litert/core";

if (Core.Validators.isEMailAddress("fenying@litert.org")) {

    console.info(`Yes`);
}
else {

    console.info(`No`);
}
```
