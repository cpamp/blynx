export class JbProgressBar {
    private _maxValue: number;
    public get maxValue() {
        return this._maxValue;
    }
    public set maxValue(maxValue: number) {
        this.setMaxValue(maxValue);
    }

    
    private _value: number;
    public get value() {
        return this._value;
    }
    public set value(value: number) {
        this.setValue(value);
    }

    private step: boolean;
    private label: boolean;

    private jbBackground: HTMLElement;
    private jbText: HTMLElement;
    constructor(private jbProgressBar: HTMLElement) {
        this.step = jbProgressBar.hasAttribute('step');
        this.label = jbProgressBar.hasAttribute('label');
        this._maxValue = jbProgressBar.hasAttribute('max-value') ? parseInt(jbProgressBar.getAttribute('max-value')) : 100;
        this._value = jbProgressBar.hasAttribute('value') ? parseInt(jbProgressBar.getAttribute('value')) : 0;

        this.jbBackground = <any>jbProgressBar.querySelector('.jb-progress-bar-bg');
        this.jbText = <any>jbProgressBar.querySelector('.jb-progress-bar-text');
        this.calculatePercentage();
        (<IHasJb<JbProgressBar>>(<any>this.jbProgressBar)).$jb = this;
    }

    private calculatePercentage() {
        let width = this.value / this.maxValue * 100;
        this.setWidth(width);
        this.updateLabel(width);
    }

    private setWidth(widthPercentage: number) {
        this.jbBackground.style.width = widthPercentage + '%';
    }

    private updateLabel(widthPercentage: number) {
        if (!this.label) return;
        let label = this.step ? `${this.value} / ${this.maxValue}` : `${widthPercentage.toFixed(0)}%`;
        this.jbText.textContent = label;
    }

    public setValue(value: number) {
        this._value = value;
        this.calculatePercentage();
    }

    public setMaxValue(maxValue: number) {
        this._maxValue = maxValue;
        this.calculatePercentage();
    }
}