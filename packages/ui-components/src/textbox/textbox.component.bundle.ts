import { Textbox } from "./textbox";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-textbox',
    styles: require('./textbox.scss')
})
export class TextboxComponentBundle extends Textbox {
    constructor(el: HTMLElement) {
        super(el);
    }
}