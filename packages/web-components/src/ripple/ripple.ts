export class JbRipple {
    private rippleContainer: HTMLElement;

    constructor(private jbRipple: HTMLElement) {
        this.setupRippleContainer();
        var mouseDown = (<any>window).PointerEvent ? 'pointerdown' : 'mousedown';
        this.jbRipple.addEventListener(mouseDown, (e: MouseEvent) => this.showRipple(e));
    }

    private setupRippleContainer() {
        this.rippleContainer = document.createElement('div');
        this.rippleContainer.className = 'jb-ripple-container';
        this.jbRipple.appendChild(this.rippleContainer);
    }

    private createRipple(e: MouseEvent): HTMLElement {
        var rect = this.jbRipple.getBoundingClientRect();
        var x = e.offsetX;
        var y;
        if (x !== void 0) {
            y = e.offsetY;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        var max;
        if (rect.width == rect.height) {
            max = rect.width * 1.412;
        } else {
            max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
        }
        var dim = max * 2 + 'px';
        var ripple = document.createElement('div');
        if (this.jbRipple.hasAttribute('jb-ripple-color')) {
            ripple.style.backgroundColor = this.jbRipple.getAttribute('jb-ripple-color');
        }
        ripple.style.width = dim;
        ripple.style.height = dim;
        ripple.style.marginLeft = -max + x + 'px';
        ripple.style.marginTop = -max + y + 'px';
        ripple.className = 'jb-ripple';
        return ripple;
    }

    private showRipple(e: MouseEvent) {
        if (this.jbRipple.hasAttribute('disabled')) return;
        var ripple = this.createRipple(e);
        this.rippleContainer.appendChild(ripple);
        window.setTimeout(function() {
            ripple.classList.add('jb-ripple-held');
        }, 0);

        var releaseEvent = ((<any>window).PointerEvent ? 'pointerup' : 'mouseup');
        var release = (ev: Event) => {
            document.removeEventListener(releaseEvent, release);
            ripple.classList.add('jb-ripple-done');

            window.setTimeout(() => {
                this.rippleContainer.removeChild(ripple);
            }, 650);
        };
        document.addEventListener(releaseEvent, release);
    }
}