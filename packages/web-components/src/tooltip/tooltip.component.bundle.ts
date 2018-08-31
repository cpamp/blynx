import { JbTooltip } from "./tooltip";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-tooltip',
    styles: require('./tooltip.scss'),
    template: require('./tooltip.html')
})
export class JbTooltipComponentBundle extends JbTooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}