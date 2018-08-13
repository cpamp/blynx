interface IHasDialog extends Element { $jb_dialog_component: JbDialog }

export class JbDialog {
    private static openedDialog: JbDialog;
    private static eventListenersDone: boolean = false;

    private static lightbox: HTMLElement;

    private actionRequired: boolean;

    constructor(private jbDialog: HTMLElement) {
        (<IHasDialog>(<any>this.jbDialog)).$jb_dialog_component = this;
        this.actionRequired = this.jbDialog.hasAttribute('jb-action-required');
        this.setupLightbox();
        if (!JbDialog.eventListenersDone) this.setupEventListener();
    }

    public open() {
        document.body.classList.add('noscroll');
        JbDialog.lightbox.style.display = 'block';
        JbDialog.openedDialog = this;
        this.jbDialog.style.display = 'block';
    }

    public close() {
        JbDialog.lightbox.style.display = 'none';
        this.jbDialog.style.display = 'none';
        document.body.classList.remove('noscroll');
    }

    private setupEventListener() {
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('jb-dialog-open')) {
                let dialog: IHasDialog = <any>document.getElementById(target.getAttribute('jb-dialog-open'));
                if (dialog != null) dialog.$jb_dialog_component.open();
            }
        });
        document.addEventListener('click', (e: MouseEvent) => {
            let target = <Element>e.target;
            if (target.hasAttribute('jb-dialog-close')) {
                let dialog: IHasDialog = <any>document.getElementById(target.getAttribute('jb-dialog-close'));
                if (dialog != null) dialog.$jb_dialog_component.close();
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