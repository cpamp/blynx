(function() {
    function createTextbox(jbTextbox: HTMLElement) {
        var wrapper = setupWrapper();
        var label = setupLabel(jbTextbox);
        var input = setupInput(jbTextbox, label);

        wrapper.appendChild(input);
        input.insertAdjacentElement('beforeBegin', label);
        jbTextbox.insertAdjacentElement('beforeBegin', wrapper);
    }

    function setupWrapper(): HTMLElement {
        var wrapper = document.createElement('div');
        wrapper.style.position = "relative";
        wrapper.style.marginTop = "20px";
        return wrapper;
    }

    const ignoreAttrs = ['color', 'placeholder'];

    function copyAttributes(from: HTMLElement, to: HTMLElement) {
        for (var i = 0; i < from.attributes.length; i++) {
            let attr = from.attributes.item(i);
            if (ignoreAttrs.indexOf(attr.nodeName) === -1) to.setAttribute(attr.nodeName, attr.nodeValue);
        }
    }

    function setupInput(jbTextbox: HTMLElement, label: HTMLElement): HTMLElement {
        var input = document.createElement('input');
        copyAttributes(jbTextbox, input);
        input.onfocus = function(e) { focused(e, label, jbTextbox); };
        input.onblur = function(e) { blurred(e, label, jbTextbox); };
        input.style.border = "none";
        input.style.background = "transparent";
        input.style.borderBottom = "lightgrey solid 2px";
        input.style.marginBottom = "2px";
        input.style.outline = "none";
        return input
    }

    function setupLabel(jbTextbox: HTMLElement): HTMLElement {
        var label = document.createElement('div');
        label.appendChild(document.createTextNode(jbTextbox.getAttribute('placeholder') || ''));
        label.style.color = jbTextbox.getAttribute('color') || "black";
        label.style.position = "absolute";
        label.style.left = "2px";
        label.style.top = "0px";
        label.style.fontSize = "1em";
        label.style.transition = "all 0.2s ease-in-out";
        return label;
    }

    function focused(e: FocusEvent, label: HTMLElement, jbBox: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        target.style.borderBottom = `solid ${jbBox.getAttribute('color') || 'black'} 2px`;
        if (target.value === '') {
            label.style.top = "-19px";
            label.style.fontSize = ".85em";
        }
    }

    function blurred(e: FocusEvent, label: HTMLElement, jbBox: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        target.style.borderBottom = "lightgrey solid 2px";
        if (target.value === '') {
            label.style.top = "0px";
            label.style.fontSize = "1em";
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var jbTextboxes = document.getElementsByTagName('jb-textbox');
        console.log(jbTextboxes.length);
        for (var i = jbTextboxes.length - 1; i >= 0; i--) {
            let jb = <HTMLElement>jbTextboxes[i];
            createTextbox(jb);
            jb.parentNode.removeChild(<any>jb);
        }
    });
})();