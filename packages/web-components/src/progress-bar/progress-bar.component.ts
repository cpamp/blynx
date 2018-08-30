import { JbProgressBar } from "./progress-bar";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-progress-bar',
    template: require('./progress-bar.html')
})
export class JbProgressBarComponent extends JbProgressBar {
    constructor(el: HTMLElement) {
        super(el);
    }
}