interface IHasDialog extends Element { $jb_dialog_component: JbDialog }

export class JbDialog {
    private static openedDialog: JbDialog;
    private static eventListenersDone: boolean = false;

    private static lightbox: HTMLElement;

    constructor(private jbDialog: HTMLElement) {
        (<IHasDialog>(<any>this.jbDialog)).$jb_dialog_component = this;
        this.setupLightbox();
        if (!JbDialog.eventListenersDone) this.setupEventListener();
    }

    public open() {
        JbDialog.lightbox.style.display = 'block';
        JbDialog.openedDialog = this;
    }

    public close() {
        JbDialog.lightbox.style.display = 'none';
    }

    private setupEventListener() {
        document.addEventListener('click', (e: MouseEvent) => {
            var target = <Element>e.target;
            if (target.hasAttribute('jb-dialog-open')) {
                var dialog: IHasDialog = <any>document.getElementById(target.getAttribute('jb-dialog-open'));
                if (dialog != null) dialog.$jb_dialog_component.open();
            }
        });
        JbDialog.eventListenersDone = true;
    }

    private setupLightbox() {
        if (JbDialog.lightbox == null) {
            var lightbox = document.querySelector('.jb-dialog-lightbox');
            if (lightbox == null) {
                lightbox = document.createElement('div');
                lightbox.classList.add('jb-dialog-lightbox');
                document.body.appendChild(lightbox);
                lightbox.addEventListener('click', (e: MouseEvent) => {
                    if (JbDialog.openedDialog != null) JbDialog.openedDialog.close();
                });
            }
            JbDialog.lightbox = <HTMLElement>lightbox;
        }
    }

    private setupHeader() {

    }

    private setupBody() {

    }

    private setupFooter() {

    }
}