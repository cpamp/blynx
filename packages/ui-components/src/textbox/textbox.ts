export class Textbox {
    private nxHelper: HTMLElement;
    private nxErrors: NodeListOf<HTMLElement>;
    private nxLabel: HTMLElement;
    private nxInput: HTMLInputElement;
    private helperHtml: string;

    constructor(private nxTextbox: HTMLElement) {
        this.nxHelper = <HTMLElement>nxTextbox.querySelector('nx-helper');
        this.nxErrors = <NodeListOf<HTMLElement>>nxTextbox.querySelectorAll('nx-error');
        this.nxLabel = <HTMLElement>nxTextbox.querySelector('label');
        this.nxInput = <HTMLInputElement>nxTextbox.querySelector('input');
        if (this.nxLabel) this.nxLabel.addEventListener('click', () => this.nxInput.focus());
        this.setupHelper();
        this.setupInput();
        this.setWidth();
    }

    private setupHelper() {
        if (this.nxHelper == null) {
            this.nxHelper = document.createElement('nx-helper');
        }
        this.nxHelper.innerHTML = this.nxHelper.innerHTML == '' ? '&nbsp;' : this.nxHelper.innerHTML;
        this.helperHtml = this.nxHelper.innerHTML;
    }

    private setWidth() {
        if (this.nxLabel) this.nxLabel.style.width = this.nxInput.offsetWidth + 'px';
        this.nxHelper.style.width = this.nxInput.offsetWidth + 'px';
    }

    private setupInput() {
        this.nxTextbox.removeChild(this.nxInput);
        let borderBottom = document.createElement('span');
        borderBottom.classList.add('nx-input-border-bottom');
        borderBottom.appendChild(this.nxInput);
        this.nxTextbox.insertBefore(borderBottom, this.nxTextbox.firstChild);
        this.nxInput.addEventListener('focus', (e) => { this.focused(e); });
        this.nxInput.addEventListener('blur', (e) => { this.blurred(e); });
    }

    private focused(e: FocusEvent) {
        this.nxTextbox.classList.add('nx-input-focused');
    }

    private blurred(e: FocusEvent) {
        this.nxTextbox.classList.remove('nx-input-focused');
        if (this.nxInput.value === '') {
            this.nxTextbox.classList.remove('nx-has-value');
        } else {
            this.nxTextbox.classList.add('nx-has-value');
        }
        this.validate();
    }

    private getError(type: string): HTMLElement {
        for (let i = 0; i < this.nxErrors.length; i++) {
            if (this.nxErrors.item(i).hasAttribute(type)) return this.nxErrors.item(i);
        }
        return null;
    }

    private error(type: string) {
        let err = this.getError(type);
        this.nxHelper.innerHTML = err ? err.innerHTML : '&nbsp;';
        this.nxTextbox.classList.add('nx-input-error');
    }

    private validate() {
        let v = this.nxInput.validity;

        try {
            (<any>v).tooShort = false;
            if (this.nxInput.hasAttribute('minlength')) (<any>v).tooShort = this.nxInput.value.length < parseInt(this.nxInput.getAttribute('minlength'));
        } catch { /* Nothing to do */ }

        if (v.badInput) {
            return this.error('bad');
        } else if (v.customError) {
            return this.error('custom');
        } else if (v.valueMissing) {
            return this.error('required');
        } else if (v.patternMismatch) {
            return this.error('pattern');
        } else if (v.rangeOverflow) {
            return this.error('max');
        } else if (v.rangeUnderflow) {
            return this.error('min');
        } else if (v.stepMismatch) {
            return this.error('step');
        } else if ((<any>v).tooShort) {
            return this.error('minlength')
        } else if (v.tooLong) {
            return this.error('maxlength');
        } else if (v.typeMismatch) {
            return this.error('type');
        } else {
            this.nxHelper.innerHTML = this.helperHtml;
            this.nxTextbox.classList.remove('nx-input-error');
        }
    }
}