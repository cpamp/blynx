# @jabel/test

Javascript test decorators.

## Example

```typescript
@TestClass()
export class Testing {
    @TestMethod()
    public TestMe() {
        throw "err";
    }

    @TestMethod()
    public ServiceTest(assert: Assert) {
        assert.AreEqual(true, true);
    }
}
```

Outputs:

```
✗ Testing (1 of 2) Passed
        ✗ TestMe Failed on ERROR: err
```