import { JbButton } from "./button";
import { Component } from "@blynx/browser-component";

@Component({
    selector: '[jb-button]'
})
export class JbButtonComponent extends JbButton {
    constructor(el: HTMLElement) {
        super(el);
    }
}