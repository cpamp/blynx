export class JbDialog {
    private static openedDialog: JbDialog;
    private static eventListenersDone: boolean = false;

    private static lightbox: HTMLElement;

    private actionRequired: boolean;

    constructor(private jbDialog: HTMLElement) {
        (<IHasJb<JbDialog>>(<any>this.jbDialog)).$jb = this;
        this.actionRequired = this.jbDialog.hasAttribute('jb-action-required');
        this.setupLightbox();
        if (!JbDialog.eventListenersDone) this.setupEventListener();
    }

    public open() {
        document.body.classList.add('noscroll');
        JbDialog.lightbox.style.visibility = 'visible';
        this.jbDialog.style.visibility = 'visible';
        JbDialog.openedDialog = this;
        JbDialog.lightbox.style.opacity = '1';
        this.jbDialog.style.opacity = '1';
    }

    public close() {
        JbDialog.lightbox.style.visibility = 'hidden';
        this.jbDialog.style.visibility = 'hidden';
        JbDialog.lightbox.style.opacity = '0';
        this.jbDialog.style.opacity = '0';
        document.body.classList.remove('noscroll');
    }

    private setupEventListener() {
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('jb-dialog-open')) {
                let dialog: IHasJb<JbDialog> = <any>document.getElementById(target.getAttribute('jb-dialog-open'));
                if (dialog != null) dialog.$jb.open();
            }
        });
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('jb-dialog-close')) {
                let dialog: IHasJb<JbDialog> = <any>document.getElementById(target.getAttribute('jb-dialog-close'));
                if (dialog != null) dialog.$jb.close();
            }
        });
        JbDialog.eventListenersDone = true;
    }

    private setupLightbox() {
        if (JbDialog.lightbox == null) {
            let lightbox = document.querySelector('.jb-dialog-dim');
            if (lightbox == null) {
                lightbox = document.createElement('div');
                lightbox.classList.add('jb-dialog-dim');
                document.body.appendChild(lightbox);
                lightbox.addEventListener('click', (e: Event) => {
                    if (JbDialog.openedDialog != null && JbDialog.openedDialog.actionRequired === false) JbDialog.openedDialog.close();
                });
            }
            JbDialog.lightbox = <HTMLElement>lightbox;
        }
    }
}