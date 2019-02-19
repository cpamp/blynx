enum Position {
    Top, Right, Bottom, Left
}

export class JbTooltip {
    private position: Position;
    private text: string;
    private tooltip: HTMLElement;
    private static topLeft: HTMLElement;

    constructor(private jbTooltip: HTMLElement) {
        this.position = jbTooltip.hasAttribute('jb-tooltip-top') ? Position.Top :
            jbTooltip.hasAttribute('jb-tooltip-right') ? Position.Right :
                jbTooltip.hasAttribute('jb-tooltip-left') ? Position.Left : Position.Bottom;

        this.text = jbTooltip.getAttribute('jb-tooltip');
        if (!JbTooltip.topLeft) {
            JbTooltip.topLeft = document.createElement('div');
            JbTooltip.topLeft.style.cssText = 'position:absolute;left:0;top:0';
            document.body.appendChild(JbTooltip.topLeft);
        }
        this.create();
    }

    private bind() {
        var hasPointer: boolean = (<any>window).PointerEvents != null;
        this.jbTooltip.addEventListener(hasPointer ? 'pointerenter' : 'mouseover', () => {
            this.show();
        });
        this.jbTooltip.addEventListener(hasPointer ? 'pointerleave' : 'mouseout', () => {
            this.hide();
        });
    }

    private getColorClass() {
        return this.jbTooltip.hasAttribute('jb-tooltip-primary') ? 'jb-primary' :
            this.jbTooltip.hasAttribute('jb-tooltip-warn') ? 'jb-warn' :
                this.jbTooltip.hasAttribute('jb-tooltip-danger') ? 'jb-danger' : 'jb-default';
    }

    private getPositionClass() {
        let pos = Position[this.position].toLowerCase();
        return `jb-tooltip-${pos}`;
    }

    private create() {
        let tt = document.createElement('div');
        tt.classList.add('jb-tooltip');
        tt.classList.add(this.getColorClass());
        tt.classList.add(this.getPositionClass());

        let pointer = document.createElement('div');
        pointer.classList.add('jb-tooltip-pointer')

        let text = document.createElement('div');
        text.classList.add('jb-tooltip-text');
        text.textContent = this.text;
        tt.appendChild(pointer);
        tt.appendChild(text);

        document.body.appendChild(tt);
        this.tooltip = tt;
        this.bind();
    }

    private getPosition(el: HTMLElement) {
        var rect = el.getBoundingClientRect();
        var topLeftRect = JbTooltip.topLeft.getBoundingClientRect();
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
        let rect = this.getPosition(this.jbTooltip);
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