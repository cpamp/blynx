# @blynx/ui-components

Fancy blynx web components.

## Textbox

### Example

```html
<jb-textbox>
    <label>Email</label>
    <input type="email" required>
    <jb-helper>Enter your email</jb-helper>
    <jb-error required>Email is required</jb-error>
    <jb-error type>Not a valid email!</jb-error>
</jb-textbox>
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