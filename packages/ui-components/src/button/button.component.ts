import { JbButton } from "./button";
import { Component } from "@blynx/component";

@Component({
    selector: '[jb-button]'
})
export class JbButtonComponent extends JbButton {
    constructor(el: HTMLElement) {
        super(el);
    }
}