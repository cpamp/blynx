import { Component } from "@blynx/component/lib/esm2015";
import { Button } from "./button";

@Component({
    selector: '[nx-button]',
    styles: require('./button.scss')
})
export class ButtonComponentBundle extends Button {
    constructor(el: HTMLElement) {
        super(el);
    }
}