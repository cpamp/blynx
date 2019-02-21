import { Dialog } from "./dialog";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-dialog',
    styles: require('./dialog.scss')
})
export class DialogComponentBundle extends Dialog { 
    constructor(el: HTMLElement) {
        super(el);
    }
}