/**
 * Copyright 2020 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type IWaitResult<T, E> = {

    success: true;

    result: T;

} | {

    success: false;

    result: E;
};

/**
 * Sleep for determined time and then wake up.
 *
 * NOTE: This method SHOULD never fail because timer wouldn't be cancelled.
 *
 * @param ms    Milliseconds to wait
 * @param args  The result of promise resolved.
 */
export function sleep<T extends any[]>(
    ms: number,
    ...args: T
): Promise<T> {

    return new Promise<T>((resolve) => setTimeout(resolve, ms, args));
}

declare function setImmediate(cb: any): void;

/**
 * Call the function after 0ms, which means in next tick.
 */
export const nextTick: <T extends any[]>(
    fn: (...args: T) => void,
    ...args: T
) => void = typeof setImmediate === "function" ?
    setImmediate : function(fn: Function, ...args: any[]): void {
        setTimeout(fn, 0, ...args);
    };

/**
 * Wait for multi-tasks, and get all results, whatever succeed or failed.
 *
 * @param tasks The all tasks' promises.
 */
export function multiTasks<T, E>(
    tasks: Array<Promise<T>>
): Promise<Array<IWaitResult<T, E>>> {

    return new Promise<any>(function(resolve): void {

        let ret: Array<IWaitResult<T, E>> = Array(tasks.length);

        let done: number = 0;

        for (let i = 0; i < tasks.length; i++) {

            tasks[i].then(function(r): void {

                ret[i] = {
                    success: true,
                    result: r
                };

                if (++done === tasks.length) {

                    setTimeout(resolve, 0, ret);
                }

            }).catch(function(e): void {

                ret[i] = {
                    success: false,
                    result: e
                };

                if (++done === tasks.length) {

                    setTimeout(resolve, 0, ret);
                }
            });
        }
    });
}
