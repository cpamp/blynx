export class Dialog {
    private static openedDialog: Dialog;
    private static eventListenersDone: boolean = false;

    private static lightbox: HTMLElement;

    private actionRequired: boolean;

    constructor(private nxDialog: HTMLElement) {
        (<IHas<Dialog>>(<any>this.nxDialog)).$nx = this;
        this.actionRequired = this.nxDialog.hasAttribute('nx-action-required');
        this.setupLightbox();
        if (!Dialog.eventListenersDone) this.setupEventListener();
    }

    public open() {
        document.body.classList.add('noscroll');
        Dialog.lightbox.style.visibility = 'visible';
        this.nxDialog.style.visibility = 'visible';
        Dialog.openedDialog = this;
        Dialog.lightbox.style.opacity = '1';
        this.nxDialog.style.opacity = '1';
    }

    public close() {
        Dialog.lightbox.style.visibility = 'hidden';
        this.nxDialog.style.visibility = 'hidden';
        Dialog.lightbox.style.opacity = '0';
        this.nxDialog.style.opacity = '0';
        document.body.classList.remove('noscroll');
    }

    private setupEventListener() {
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('nx-dialog-open')) {
                let dialog: IHas<Dialog> = <any>document.getElementById(target.getAttribute('nx-dialog-open'));
                if (dialog != null) dialog.$nx.open();
            }
        });
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('nx-dialog-close')) {
                let dialog: IHas<Dialog> = <any>document.getElementById(target.getAttribute('nx-dialog-close'));
                if (dialog != null) dialog.$nx.close();
            }
        });
        Dialog.eventListenersDone = true;
    }

    private setupLightbox() {
        if (Dialog.lightbox == null) {
            let lightbox = document.querySelector('.nx-dialog-dim');
            if (lightbox == null) {
                lightbox = document.createElement('div');
                lightbox.classList.add('nx-dialog-dim');
                document.body.appendChild(lightbox);
                lightbox.addEventListener('click', (e: Event) => {
                    if (Dialog.openedDialog != null && Dialog.openedDialog.actionRequired === false) Dialog.openedDialog.close();
                });
            }
            Dialog.lightbox = <HTMLElement>lightbox;
        }
    }
}