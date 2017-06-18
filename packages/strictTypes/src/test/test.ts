

import { StrictTypes, Nullable, Arguments } from "../index";

class Foo {}

export class Test {
    @StrictTypes(Function, Boolean, String)
    public TestMethod(func: any, bool: any, str: any) {

    }

    @StrictTypes(String, Array, Nullable(Object))
    public NoNulls(str: any, arr: any, obj: any) {

    }

    @StrictTypes(String, Object, Arguments(String))
    public Args(str: any, obj: any, ...args: any[]) {
        
    }

    @StrictTypes(String, Object, Arguments(Nullable(String)))
    public NullArgs(str: any, obj: any, ...args: any[]) {
        
    }

    @StrictTypes(Arguments(String), String)
    public WrongArgs(str: any, str2: any) {

    }

    @StrictTypes(Foo, Nullable(Foo))
    public CustomClass(foo: any, foo2: any) {

    }
}

function Try(func: ((...args: any[]) => any)) {
    try {
        return func()
    } catch(e) {
        console.log(e);
    }
}

var t = new Test();

console.log('\nTest');
Try(() => t.TestMethod(function() {}, true, []));
Try(() => t.TestMethod(function() {}, true, ''));
Try(() => t.TestMethod(null, true, ''));

console.log('\nNull no');
Try(() => t.NoNulls('', [], null));
Try(() => t.NoNulls('', [], 'null'));
Try(() => t.NoNulls('', [], void 0));

console.log('\nargs');
Try(() => t.Args('', {}, '', ''));
Try(() => t.Args('', {}, '', []));
Try(() => t.Args('', {}, '', null));

console.log('\nNull args');
Try(() => t.NullArgs('', {}, '', ''));
Try(() => t.NullArgs('', {}, '', []));
Try(() => t.NullArgs('', {}, '', null));

Try(() => t.WrongArgs('', ''));

console.log('\nCustom Class');
Try(() => t.CustomClass('', null));
Try(() => t.CustomClass(new Foo(), null));
Try(() => t.CustomClass(new Foo(), new Foo()));