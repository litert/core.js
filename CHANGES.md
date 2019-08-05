# Changes Logs

## v1.0.5

- Allow using partial metadata while create new error object.

## v1.0.4

- Added default metadata property for Error consturctor and definition.

## v1.0.3

- Fixed: Methods `reject` and `resolve` in RawPromise couldn't work without
  `this` binding.

## v1.0.2

- Added `module` field for error objects and constructors, hubs.
- Improved the `Async.nextTick` and `Async.sleep` method.
- Improved the documents.

## v1.0.1

- Allowed automatically generating code for defining new errors.
- Now `IErrorHub.define` throws errors defined in the default error hub.

## v1.0.0

- The first feature stable version.
- Added full documents in Simplified Chinese.

## v0.7.1

- Upgrade to TypeScript v3.1.2.
- Improved the error handling mechanism.

## v0.7.0

- Introduce new error definitions system.
- Updated method `Async.sleep`, now it accepts only one extra parameter.
- Added method `Async.multiTasks`.
- Added method `Async.nextTick`.
- Improved class `TimeoutPromise`, now the result can be handled even timeout,
  and the timer could be start manually.
- Deprecated:

  - class `Exception`
  - Type `MethodDecorator`
  - Type `ClassDecorator`
  - Type `Optional`
  - Type `Dict`

## v0.6.0

- Added new utility class `TimeoutPromise`.
- Improved the judegement of `Exception.is`.

## v0.5.0

- Added new semantic types `Nullable` and `Optional`, `Dict`.
- Now the `IDictionary` is the alias of `Dict`, and has been mark as
  `deprecated`. It will be removed in v1.0.0.
- Added valitators utility function **isEMailAddress**.
- Added valitators utility function **isDomain**.

## v0.4.1

- Fixed the bug that trace of Exception is not exact from caller.

## v0.4.0

- Now the **origin** only stand for the data carried by Exception.
- Added the property **trace** for Exception to get the trace.
- New method **is** helps determine if an error object is of LiteRT's exception.
- Added asynchronous utility function **sleep**.

## v0.3.3

- Added the signature for class/method annotation functions.

## v0.3.2

- Added the default value of **origin** for Exception class.

## v0.3.1

- Fixed method **toString** for Exception class.
- Fixed serialization of property **origin** for Exception class.

## v0.3.0

- Upgrade to TypeScript 2.7.
- Added property **origin** for Exception class.

## v0.2.0

- Added required property **type** for Exception class.

## v0.1.2

- Remove dependency of `@types/node`.

## v0.1.1

- Improved NPM commands for project.
- Added LICENSING in comments for every file.
- Added comments for source code.

## v0.1.0

- Added new template class `RawPromise`.
- Added new class `Exception`.
- Added new template type `IDictionary`.
