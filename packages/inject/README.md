# @jable/inject

Inject dependencies into injectable classes

## Example

```typescript
@Injectable()
export class Bar {
    constructor(public barProp: string = "Bar") {}
}

@Injectable()
export class Foo {
    constructor(public myString: string, public bar: Bar) {}
}

var myFoo = Injector.inject(Foo, "myString"); // Injector syntax
console.log(myFoo.myString == "myString"); // True
console.log(myFoo.bar.barProp == "Bar"); // True
myFoo.bar.barProp = "FooBar"

var myFoo2: Foo = new (<any>Foo)("mySecondString"); // TS syntax
console.log(myFoo2.myString == "mySecondString"); // True
console.log(myFoo2.bar.barProp == "FooBar"); // True
```

## Options

```typescript
/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {string} namespace Namespace of the Injectable
 * @property {{[type: string]: boolean}} exclude Excluded namespaced types, true to exclude
 * @property {boolean} inject Whether or not the class should have injectables injected into it
 */
export interface IInjectableOptions {
    namespace?: string;
    exclude?: {[type: string]: boolean};
    inject?: boolean;
}

const defaultOptions: IInjectableOptions = {
    namespace: '',
    exclude: {
        String: true,
        Number: true,
        Object: true,
        Array: true,
        Boolean: true
    },
    inject: true
}
```