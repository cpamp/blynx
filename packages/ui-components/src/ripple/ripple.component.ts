import { JbRipple } from "./ripple";
import { Component } from "@blynx/component";

@Component({
    selector: '[jb-ripple]'
})
export class JbRippleComponent extends JbRipple {
    constructor(el: HTMLElement) {
        super(el)
    }
}