# textbox

Fancy textboxes

## Example

```html
<jb-textbox name="email" type="email" placeholder="Email" required>
    <helper>Enter your email here</helper>
    <error type>Not a valid email!</error>
    <error required>Email required!</error>
</jb-textbox>
```

## Errors

`bad` - badInput

`custom` - customError

`required` - valueMissing

`pattern` - patternMismatch

`max` - rangeOverflow

`min` - rangeUnderflow

`step` - stepMismatch

`maxlength` - tooLong

`type` - typeMismatch