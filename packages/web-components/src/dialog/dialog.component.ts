import { JbDialog } from "./dialog";
import { Component } from "@jable/browser-component";

@Component({
    selector: 'jb-dialog'
})
export class JbDialogComponent extends JbDialog { 
    constructor(el: HTMLElement) {
        super(el);
    }
}