# @blynx/ui-components

Fancy blynx web components.

## Textbox

### Example

```html
<nx-textbox>
    <label>Email</label>
    <input type="email" required>
    <nx-helper>Enter your email</nx-helper>
    <nx-error required>Email is required</nx-error>
    <nx-error type>Not a valid email!</nx-error>
</nx-textbox>
```

### Errors

`bad` - badInput

`custom` - customError

`required` - valueMissing

`pattern` - patternMismatch

`max` - rangeOverflow

`min` - rangeUnderflow

`step` - stepMismatch

`maxlength` - tooLong

`type` - typeMismatch