/**
 * Copyright 2018 Angus.Fenying
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
 * @param ms Milliseconds to wait
 * @param arg The result of promise resolved.
 */
export function sleep(
    ms: number,
    arg?: any
): Promise<any[]> {

    return new Promise<any[]>((resolve) => setTimeout(resolve, ms, arg));
}

/**
 * Call the function after 0ms.
 */
export const nextTick: (
    fn: Function,
    ...args: any[]
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

        let ret: Array<IWaitResult<T, E>> = [];

        for (let p of tasks) {

            p.then(function(r): void {

                ret.push({
                    success: true,
                    result: r
                });

                if (ret.length === tasks.length) {

                    setTimeout(resolve, 0, ret);
                }

            }).catch(function(e): void {

                ret.push({
                    success: false,
                    result: e
                });

                if (ret.length === tasks.length) {

                    setTimeout(resolve, 0, ret);
                }
            });
        }
    });
}
