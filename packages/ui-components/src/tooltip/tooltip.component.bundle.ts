import { JbTooltip } from "./tooltip";
import { Component } from "@blynx/browser-component";

@Component({
    selector: '[jb-tooltip]',
    styles: require('./tooltip.scss')
})
export class JbTooltipComponentBundle extends JbTooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}