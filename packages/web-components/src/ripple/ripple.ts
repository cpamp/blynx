import { Component } from "@jable/browser-component";

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
        var size = this.jbRipple.offsetWidth * 5;
        var x = e.pageX - rect.left - (size / 2);
        var y = e.pageY - rect.top - (size / 2);
        var ripple = document.createElement('div');
        if (this.jbRipple.hasAttribute('jb-ripple-color')) {
            ripple.style.backgroundColor = this.jbRipple.getAttribute('jb-ripple-color');
        }
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
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

@Component({
    selector: '[jb-ripple]',
    styles: require('./ripple.scss')
})
export class JbRippleComponent extends JbRipple {
    constructor(el: HTMLElement) {
        super(el)
    }
}