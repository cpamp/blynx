import { Component } from "@blynx/browser-component";
import { JbButton } from "./button";

@Component({
    selector: '[jb-button]',
    styles: require('./button.scss')
})
export class JbButtonComponentBundle extends JbButton {
    constructor(el: HTMLElement) {
        super(el);
    }
}