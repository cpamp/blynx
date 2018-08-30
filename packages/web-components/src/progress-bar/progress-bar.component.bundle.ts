import { JbProgressBar } from "./progress-bar";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-progress-bar',
    styles: require('./progress-bar.scss'),
    template: require('./progress-bar.html')
})
export class JbProgressBarComponentBundle extends JbProgressBar {
    constructor(el: HTMLElement) {
        super(el);
    }
}