const Symbol = require('es6-symbol');

export const StyleSymbol = Symbol('styles');

export class ComponentRegistry {
    private static components: any[] = [];
    public static componentElements: Element[] = [];

    public static register(component: any) {
        this.components.push(component);
    }

    private static observe() {
        var MutationObserver = (<any>window).MutationObserver || (<any>window).WebKitMutationObserver || (<any>window).MozMutationObserver,
            eventListenerSupported = window.addEventListener;

        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver((mutations: MutationRecord[]) => {
                if (mutations[0].addedNodes.length) this.componentInit();
            });
            // have the observer observe foo for changes in children
            obs.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
        }
        else if (eventListenerSupported){
            document.addEventListener('DOMNodeInserted', () => this.componentInit(), false);
            document.addEventListener('DOMNodeRemoved', () => this.componentInit(), false);
        }
    }

    private static initStyles(component: any) {
        var css = component[StyleSymbol];
        if (css) {
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        }
    }

    public static init() {
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            this.initStyles(component);
        }
        this.componentInit();
        this.observe();
    }

    public static componentInit() {
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            new component();
        }
    }
}