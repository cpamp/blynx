import { Injectable } from "@jable/inject";
import "reflect-metadata";
import { ComponentRegistry, StyleSymbol } from "./ComponentRegistry";

const paramTypes = "design:paramtypes";
const inject = Injectable({exclude: {HTMLElement: true, Element: true}})

export type IOptions = {
    selector: string;
    styles: string;
}

export function Component(options: IOptions) {
    return function(constructor: Function) {
        constructor = inject(constructor);

        var metadata = Reflect.getMetadata(paramTypes, constructor);

        var htmlElementIndex = -1;
        for (var i = 0; i < metadata.length; i++) {
            if (metadata[i] === Element || metadata[i] === HTMLElement) {
                htmlElementIndex = i;
                break;
            }
        }

        var newConstructor = function() {
            var elements: NodeListOf<Element> = document.getElementsByTagName(options.selector);
            
            var params: any[] = [];
            for (let element in elements) {
                (() => {
                    params[htmlElementIndex] = element;
                    constructor.apply(this, params);
                })();
            }
        }

        newConstructor.prototype = Object.create(constructor.prototype);
        newConstructor.prototype.constructor = constructor;
        (<any>newConstructor)[StyleSymbol] = options.styles;
        ComponentRegistry.register(newConstructor);
        return <any>newConstructor;
    }
}