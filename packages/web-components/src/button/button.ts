import { JbRipple } from "../ripple/ripple";

export class JbButton {

    constructor(private jbButton: HTMLElement) {
        // this.setType();
        this.jbButton.setAttribute('jb-ripple', '');
        this.setupButton();
        new JbRipple(this.jbButton);
    }

    private setupButton() {
        var hasPointer: boolean = (<any>window).PointerEvents != null;
        this.jbButton.addEventListener(hasPointer ? 'pointerdown' : 'mousedown', () => {
            this.jbButton.classList.add('jb-button-active');
        });
        document.addEventListener(hasPointer ? 'pointerup' : 'mouseup', () => {
            this.jbButton.classList.remove('jb-button-active');
        });
        this.jbButton.addEventListener('focus', () => {
            this.jbButton.classList.add('jb-button-focus');
        });
        this.jbButton.addEventListener('blur', () => {
            this.jbButton.classList.remove('jb-button-focus');
        });
    }
}