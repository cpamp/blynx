import { Ripple } from "./ripple";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: '[nx-ripple]'
})
export class RippleComponent extends Ripple {
    constructor(el: HTMLElement) {
        super(el)
    }
}