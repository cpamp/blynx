import { Tooltip } from "./tooltip";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: '[nx-tooltip]',
    styles: require('./tooltip.scss')
})
export class TooltipComponentBundle extends Tooltip {
    constructor(el: HTMLElement) {
        super(el);
    }
}