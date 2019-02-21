import { ProgressBar } from "./progress-bar";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-progress-bar',
    styles: require('./progress-bar.scss'),
    template: require('./progress-bar.html')
})
export class ProgressBarComponentBundle extends ProgressBar {
    constructor(el: HTMLElement) {
        super(el);
    }
}