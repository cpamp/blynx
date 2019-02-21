export class ProgressBar {
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

    private nxBackground: HTMLElement;
    private nxText: HTMLElement;
    constructor(private nxProgressBar: HTMLElement) {
        this.step = nxProgressBar.hasAttribute('step');
        this.label = nxProgressBar.hasAttribute('label');
        this._maxValue = nxProgressBar.hasAttribute('max-value') ? parseInt(nxProgressBar.getAttribute('max-value')) : 100;
        this._value = nxProgressBar.hasAttribute('value') ? parseInt(nxProgressBar.getAttribute('value')) : 0;

        this.nxBackground = <any>nxProgressBar.querySelector('.nx-progress-bar-bg');
        this.nxText = <any>nxProgressBar.querySelector('.nx-progress-bar-text');
        this.calculatePercentage();
        (<IHas<ProgressBar>>(<any>this.nxProgressBar)).$nx = this;
    }

    private calculatePercentage() {
        let width = this.value / this.maxValue * 100;
        this.setWidth(width);
        this.updateLabel(width);
    }

    private setWidth(widthPercentage: number) {
        this.nxBackground.style.width = widthPercentage + '%';
    }

    private updateLabel(widthPercentage: number) {
        if (!this.label) return;
        let label = this.step ? `${this.value} / ${this.maxValue}` : `${widthPercentage.toFixed(0)}%`;
        this.nxText.textContent = label;
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