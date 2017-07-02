import { JbTextbox } from "./textbox";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-textbox',
    styles: require('./textbox.scss')
})
export class JbTextboxComponentBundle extends JbTextbox {
    constructor(el: HTMLElement) {
        super(el);
    }
}