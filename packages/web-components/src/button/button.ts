import { JbRipple } from "../ripple/ripple";

enum ButtonType {
    Fab,
    Raised,
    Flat
}

export class JbButton {
    private type: ButtonType;

    constructor(private jbButton: HTMLElement) {
        this.setType();
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

    private setType() {
        switch (this.jbButton.getAttribute('jb-button').toLowerCase()) {
            case ButtonType[ButtonType.Fab].toLowerCase():
                this.type = ButtonType.Fab;
                break;
            case ButtonType[ButtonType.Flat].toLowerCase():
                this.type = ButtonType.Flat;
                break;
            case ButtonType[ButtonType.Raised].toLowerCase():
            default:
                this.type = ButtonType.Raised;
                break;
        }
        this.jbButton.setAttribute('jb-button', ButtonType[this.type].toLowerCase());
    }
}