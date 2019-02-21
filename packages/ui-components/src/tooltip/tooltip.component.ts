import { Tooltip } from "./tooltip";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: '[nx-tooltip]'
})
export class TooltipComponent extends Tooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}