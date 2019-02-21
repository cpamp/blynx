import { ProgressBar } from "./progress-bar";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-progress-bar',
    template: require('./progress-bar.html')
})
export class ProgressBarComponent extends ProgressBar {
    constructor(el: HTMLElement) {
        super(el);
    }
}