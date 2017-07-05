import { JbDialog } from "./dialog";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-dialog',
    styles: require('./dialog.scss')
})
export class JbDialogComponentBundle extends JbDialog { 
    constructor(el: HTMLElement) {
        super(el);
    }
}