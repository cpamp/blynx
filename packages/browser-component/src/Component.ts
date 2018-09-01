import { Injectable } from "@jable/inject";
import "reflect-metadata";
import { ComponentRegistry, StyleSymbol } from "./ComponentRegistry";

const paramTypes = "design:paramtypes";
const inject = Injectable({exclude: {HTMLElement: true, Element: true}})

export type IOptions = {
    selector: string;
    styles?: string;
    template?: string;
}

function initTemplate(element: Element, template: string | undefined) {
    if (template == null) return;
    let elHtml = element.innerHTML;
    let elWrapper = document.createElement('div');
    elWrapper.innerHTML = elHtml;
    element.innerHTML = template;
    let jbContents = element.querySelectorAll('jb-content');
    for (let i = 0; i < jbContents.length; i++) {
        let jbContent = jbContents.item(i);
        if (jbContent.hasAttribute('selector')) {
            let content = elWrapper.querySelector(<string>jbContent.getAttribute('selector'));
            if (content) jbContent.innerHTML = content.innerHTML;
        } else {
            jbContent.innerHTML = elWrapper.innerHTML;
        }
    }
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
                ComponentRegistry.componentElements[options.selector] = ComponentRegistry.componentElements[options.selector] || [];
                if (ComponentRegistry.componentElements[options.selector].indexOf(elements[i]) === -1) {
                    let el = elements.item(i);
                    initTemplate(el, options.template);
                    params[htmlElementIndex] = el;
                    new (Function.prototype.bind.apply(constructor, [null, ...params]))();
                    ComponentRegistry.componentElements[options.selector].push(el);
                }
            }
        };

        newConstructor.prototype = Object.create(constructor.prototype);
        newConstructor.prototype.constructor = constructor;
        (<any>newConstructor)[StyleSymbol] = options.styles;
        ComponentRegistry.register(newConstructor);
        return <any>newConstructor;
    }
}