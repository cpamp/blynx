enum Position {
    Top, Right, Bottom, Left
}

export class Tooltip {
    private position: Position;
    private text: string;
    private tooltip: HTMLElement;
    private static topLeft: HTMLElement;

    constructor(private nxTooltip: HTMLElement) {
        this.position = nxTooltip.hasAttribute('nx-tooltip-top') ? Position.Top :
            nxTooltip.hasAttribute('nx-tooltip-right') ? Position.Right :
                nxTooltip.hasAttribute('nx-tooltip-left') ? Position.Left : Position.Bottom;

        this.text = nxTooltip.getAttribute('nx-tooltip');
        if (!Tooltip.topLeft) {
            Tooltip.topLeft = document.createElement('div');
            Tooltip.topLeft.style.cssText = 'position:absolute;left:0;top:0';
            document.body.appendChild(Tooltip.topLeft);
        }
        this.create();
    }

    private bind() {
        let hasPointer: boolean = (<any>window).PointerEvents != null;
        this.nxTooltip.addEventListener(hasPointer ? 'pointerenter' : 'mouseover', () => {
            this.show();
        });
        this.nxTooltip.addEventListener(hasPointer ? 'pointerleave' : 'mouseout', () => {
            this.hide();
        });
    }

    private getColorClass() {
        return this.nxTooltip.hasAttribute('nx-tooltip-primary') ? 'nx-primary' :
            this.nxTooltip.hasAttribute('nx-tooltip-warn') ? 'nx-warn' :
                this.nxTooltip.hasAttribute('nx-tooltip-danger') ? 'nx-danger' : 'nx-default';
    }

    private getPositionClass() {
        let pos = Position[this.position].toLowerCase();
        return `nx-tooltip-${pos}`;
    }

    private create() {
        let tt = document.createElement('div');
        tt.classList.add('nx-tooltip');
        tt.classList.add(this.getColorClass());
        tt.classList.add(this.getPositionClass());

        let pointer = document.createElement('div');
        pointer.classList.add('nx-tooltip-pointer')

        let text = document.createElement('div');
        text.classList.add('nx-tooltip-text');
        text.textContent = this.text;
        tt.appendChild(pointer);
        tt.appendChild(text);

        document.body.appendChild(tt);
        this.tooltip = tt;
        this.bind();
    }

    private getPosition(el: HTMLElement) {
        let rect = el.getBoundingClientRect();
        let topLeftRect = Tooltip.topLeft.getBoundingClientRect();
        let left = rect.left - topLeftRect.left,
            top = rect.top - topLeftRect.top,
            width = rect.right - rect.left,
            height = rect.bottom - rect.top;
        return {
            top: top,
            right: left + width,
            bottom: top + height,
            left: left,
            height: height,
            width: width
        };
    }

    private show() {
        let left = 0, top = 0;
        let rect = this.getPosition(this.nxTooltip);
        let ttRect = this.getPosition(this.tooltip);
        let centerWidth = rect.width / 2;
        let centerHeight = rect.height / 2;
        let ttCenterWidth = ttRect.width / 2;
        let ttCenterHeight = ttRect.height / 2;

        switch (this.position) {
            case Position.Top:
                left = rect.left + centerWidth - ttCenterWidth;
                top = rect.top - ttRect.height;
                break;
            case Position.Right:
                left = rect.right;
                top = rect.top + centerHeight - ttCenterHeight;
                break;
            case Position.Left:
                left = rect.left - ttRect.width;
                top = rect.top + centerHeight - ttCenterHeight;
                break;
            case Position.Bottom:
            default:
                left = rect.left + centerWidth - ttCenterWidth;;
                top = rect.bottom;
                break;
        }
        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.visibility = 'visible';
        this.tooltip.style.opacity = '1';
    }

    private hide() {
        this.tooltip.style.visibility = 'hidden';
        this.tooltip.style.opacity = '0';
    }
}