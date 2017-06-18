# jable-strict-types

Decorate a method for strict types

## Example

```typescript
class MyCustomClass {}

export class Test {
    @StrictTypes(Function, Boolean, Nullable(String), Arguments(Nullable(Number)))
    public TestMethod(func, bool, str) { }

    @StrictTypes(MyCustomClass, Boolean)
    public Custom(cust, boolean) { }
}
var t = new Test();

t.TestMethod(null, true, '', 1); // Throws at argument index 0
t.TestMethod(function() {}, true, null); // Does not throw
t.TestMethod(function() {}, true, null, 1, 2, 3, false); // Throws at argument index 6

t.Custom(new MyCustomClass(), true); // Does not throw
```