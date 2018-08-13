export class JbRipple {
    private rippleContainer: HTMLElement;

    constructor(private jbRipple: HTMLElement) {
        this.setupRippleContainer();
        let mouseDown = (<any>window).PointerEvent ? 'pointerdown' : 'mousedown';
        this.jbRipple.addEventListener(mouseDown, (e: Event) => this.showRipple(e));
    }

    private setupRippleContainer() {
        this.rippleContainer = document.createElement('div');
        this.rippleContainer.className = 'jb-ripple-container';
        this.jbRipple.appendChild(this.rippleContainer);
    }

    private createRipple(e: Event): HTMLElement {
        let mouseEv = e as MouseEvent;
        let rect = this.jbRipple.getBoundingClientRect();
        let x = mouseEv.offsetX;
        let y;
        if (x !== void 0) {
            y = mouseEv.offsetY;
        } else {
            x = mouseEv.clientX - rect.left;
            y = mouseEv.clientY - rect.top;
        }
        let max;
        if (rect.width == rect.height) {
            max = rect.width * 1.412;
        } else {
            max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
        }
        let dim = max * 2 + 'px';
        let ripple = document.createElement('div');
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

    private showRipple(e: Event) {
        if (this.jbRipple.hasAttribute('disabled')) return;
        let ripple = this.createRipple(e);
        this.rippleContainer.appendChild(ripple);
        window.setTimeout(function() {
            ripple.classList.add('jb-ripple-held');
        }, 0);

        let releaseEvent = ((<any>window).PointerEvent ? 'pointerup' : 'mouseup');
        let release = (ev: Event) => {
            document.removeEventListener(releaseEvent, release);
            ripple.classList.add('jb-ripple-done');

            window.setTimeout(() => {
                this.rippleContainer.removeChild(ripple);
            }, 650);
        };
        document.addEventListener(releaseEvent, release);
    }
}