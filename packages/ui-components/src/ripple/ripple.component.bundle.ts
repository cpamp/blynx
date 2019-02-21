import { Ripple } from "./ripple";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: '[nx-ripple]',
    styles: require('./ripple.scss')
})
export class RippleComponentBundle extends Ripple {
    constructor(el: HTMLElement) {
        super(el)
    }
}