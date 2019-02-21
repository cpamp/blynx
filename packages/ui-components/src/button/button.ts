import { Ripple } from "../ripple/ripple";

export class Button {
    constructor(private nxButton: HTMLElement) {
        this.nxButton.setAttribute('nx-ripple', '');
        this.setupButton();
        new Ripple(this.nxButton);
    }

    private setupButton() {
        let hasPointer: boolean = (<any>window).PointerEvents != null;
        this.nxButton.addEventListener(hasPointer ? 'pointerdown' : 'mousedown', () => {
            this.nxButton.classList.add('nx-button-active');
        });
        document.addEventListener(hasPointer ? 'pointerup' : 'mouseup', () => {
            this.nxButton.classList.remove('nx-button-active');
        });
        this.nxButton.addEventListener('focus', () => {
            this.nxButton.classList.add('nx-button-focus');
        });
        this.nxButton.addEventListener('blur', () => {
            this.nxButton.classList.remove('nx-button-focus');
        });
    }
}