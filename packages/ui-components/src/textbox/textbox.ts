export class JbTextbox {
    private jbHelper: HTMLElement;
    private jbErrors: NodeListOf<HTMLElement>;
    private jbLabel: HTMLElement;
    private jbInput: HTMLInputElement;
    private helperHtml: string;

    constructor(private jbTextbox: HTMLElement) {
        this.jbHelper = <HTMLElement>jbTextbox.querySelector('jb-helper');
        this.jbErrors = <NodeListOf<HTMLElement>>jbTextbox.querySelectorAll('jb-error');
        this.jbLabel = <HTMLElement>jbTextbox.querySelector('label');
        this.jbInput = <HTMLInputElement>jbTextbox.querySelector('input');
        if (this.jbLabel) this.jbLabel.addEventListener('click', () => this.jbInput.focus());
        this.setupHelper();
        this.setupInput();
        this.setWidth();
    }

    private setupHelper() {
        if (this.jbHelper == null) {
            this.jbHelper = document.createElement('jb-helper');
        }
        this.jbHelper.innerHTML = this.jbHelper.innerHTML == '' ? '&nbsp;' : this.jbHelper.innerHTML;
        this.helperHtml = this.jbHelper.innerHTML;
    }

    private setWidth() {
        if (this.jbLabel) this.jbLabel.style.width = this.jbInput.offsetWidth + 'px';
        this.jbHelper.style.width = this.jbInput.offsetWidth + 'px';
    }

    private setupInput() {
        this.jbTextbox.removeChild(this.jbInput);
        let borderBottom = document.createElement('span');
        borderBottom.classList.add('jb-input-border-bottom');
        borderBottom.appendChild(this.jbInput);
        this.jbTextbox.insertBefore(borderBottom, this.jbTextbox.firstChild);
        this.jbInput.addEventListener('focus', (e) => { this.focused(e); });
        this.jbInput.addEventListener('blur', (e) => { this.blurred(e); });
    }

    private focused(e: FocusEvent) {
        this.jbTextbox.classList.add('jb-input-focused');
    }

    private blurred(e: FocusEvent) {
        this.jbTextbox.classList.remove('jb-input-focused');
        if (this.jbInput.value === '') {
            this.jbTextbox.classList.remove('jb-has-value');
        } else {
            this.jbTextbox.classList.add('jb-has-value');
        }
        this.validate();
    }

    private getError(type: string): HTMLElement {
        for (let i = 0; i < this.jbErrors.length; i++) {
            if (this.jbErrors.item(i).hasAttribute(type)) return this.jbErrors.item(i);
        }
        return null;
    }

    private error(type: string) {
        let err = this.getError(type);
        this.jbHelper.innerHTML = err ? err.innerHTML : '&nbsp;';
        this.jbTextbox.classList.add('jb-input-error');
    }

    private validate() {
        let v = this.jbInput.validity;

        try {
            (<any>v).tooShort = false;
            if (this.jbInput.hasAttribute('minlength')) (<any>v).tooShort = this.jbInput.value.length < parseInt(this.jbInput.getAttribute('minlength'));
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
            this.jbHelper.innerHTML = this.helperHtml;
            this.jbTextbox.classList.remove('jb-input-error');
        }
    }
}