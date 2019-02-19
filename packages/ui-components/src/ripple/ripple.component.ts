import { JbRipple } from "./ripple";
import { Component } from "@blynx/browser-component";

@Component({
    selector: '[jb-ripple]'
})
export class JbRippleComponent extends JbRipple {
    constructor(el: HTMLElement) {
        super(el)
    }
}