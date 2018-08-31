import { JbTooltip } from "./tooltip";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-tooltip',
    template: require('./tooltip.html')
})
export class JbTooltipComponent extends JbTooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}