import { JbTextbox } from "./textbox";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-textbox'
})
export class JbTextboxComponent extends JbTextbox {
    constructor(el: HTMLElement) {
        super(el);
    }
}