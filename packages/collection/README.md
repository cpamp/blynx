# deprecated

Logs a warning to the console for deprecated classes and methods

## Example

```typescript
@DeprecatedClass() // Logs on instantiation
class Deprecated {
    @DeprecatedMethod() // Logs on call
    public test(value: string) {
        console.log(value);
    }
}
```