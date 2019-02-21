import { Button } from "./button";
import { Component } from "@blynx/component/lib/esm2015";

@Component({
    selector: '[nx-button]'
})
export class ButtonComponent extends Button {
    constructor(el: HTMLElement) {
        super(el);
    }
}