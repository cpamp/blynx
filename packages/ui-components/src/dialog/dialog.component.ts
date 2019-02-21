import { Dialog } from "./dialog";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: 'nx-dialog'
})
export class DialogComponent extends Dialog { 
    constructor(el: HTMLElement) {
        super(el);
    }
}