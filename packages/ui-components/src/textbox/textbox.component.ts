import { Textbox } from "./textbox";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-textbox'
})
export class TextboxComponent extends Textbox {
    constructor(el: HTMLElement) {
        super(el);
    }
}