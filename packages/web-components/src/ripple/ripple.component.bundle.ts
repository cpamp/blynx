import { JbRipple } from "./ripple";
import { Component } from "@jable/browser-component";

@Component({
    selector: '[jb-ripple]',
    styles: require('./ripple.scss')
})
export class JbRippleComponentBundle extends JbRipple {
    constructor(el: HTMLElement) {
        super(el)
    }
}