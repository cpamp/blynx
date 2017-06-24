var Symbol = require('es6-symbol');

export var StyleSymbol = Symbol('styles');

export class ComponentRegistry {
    private static components: any[] = [];

    public static register(component: any) {
        this.components.push(component);
    }

    public static init() {
        for (let component of this.components) {
            var css = component[StyleSymbol];
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
            new component();
        }
    }
}