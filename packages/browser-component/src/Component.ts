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
            var elements: NodeListOf<Element> = document.querySelectorAll(options.selector);
            
            var params: any[] = [];
            for (var i = 0; i < elements.length; i++) {
                params[htmlElementIndex] = elements.item(i);
                new (Function.prototype.bind.apply(constructor, [null, ...params]))();
            }
        }

        newConstructor.prototype = Object.create(constructor.prototype);
        newConstructor.prototype.constructor = constructor;
        (<any>newConstructor)[StyleSymbol] = options.styles;
        ComponentRegistry.register(newConstructor);
        return <any>newConstructor;
    }
}