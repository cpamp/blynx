import { JbTooltip } from "./tooltip";
import { Component } from "@blynx/component";

@Component({
    selector: '[jb-tooltip]'
})
export class JbTooltipComponent extends JbTooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}