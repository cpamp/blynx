(function() {
    function createTextbox(jbTextbox: HTMLElement) {
        var wrapper = setupWrapper();
        var label = setupLabel(jbTextbox);
        var helper = setupHelper(jbTextbox);
        var input = setupInput(jbTextbox, label, helper, wrapper);

        wrapper.appendChild(input);
        input.parentNode.insertBefore(label, input);
        input.parentNode.insertBefore(helper, input.nextSibling);
        jbTextbox.parentNode.insertBefore(wrapper, jbTextbox);
    }

    function setupWrapper(): HTMLElement {
        var wrapper = document.createElement('div');
        wrapper.className = "jb-textbox";
        return wrapper;
    }

    const ignoreAttrs = ['placeholder'];

    function copyAttributes(from: HTMLElement, to: HTMLElement) {
        for (var i = 0; i < from.attributes.length; i++) {
            let attr = from.attributes.item(i);
            if (ignoreAttrs.indexOf(attr.nodeName) === -1) to.setAttribute(attr.nodeName, attr.nodeValue);
        }
    }

    function setupHelper(jbTextbox: HTMLElement): HTMLElement {
        var helper = document.createElement('div');
        helper.className = "jb-helper";
        var jbHelper = jbTextbox.getElementsByTagName('helper');
        helper.innerHTML = jbHelper.length > 0 ? jbHelper[0].innerHTML : '&nbsp;';
        return helper;
    }

    function setupInput(jbTextbox: HTMLElement, label: HTMLElement, helper: HTMLElement, wrapper: HTMLElement): HTMLElement {
        var input = document.createElement('input');
        copyAttributes(jbTextbox, input);
        input.addEventListener('focus', function(e) { focused(e, wrapper); });
        input.addEventListener('blur', function(e) { blurred(e, label, helper, wrapper, jbTextbox); });
        input.classList.add("jb-input");
        return input
    }

    function setupLabel(jbTextbox: HTMLElement): HTMLElement {
        var label = document.createElement('label');
        label.appendChild(document.createTextNode(jbTextbox.getAttribute('placeholder') || ''));
        label.className = "jb-label";

        var name = jbTextbox.getAttribute('name');
        if (name) label.setAttribute('for', name);
        return label;
    }

    function focused(e: FocusEvent, wrapper: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        wrapper.classList.add('jb-focused');
    }

    function blurred(e: FocusEvent, label: HTMLElement, helper: HTMLElement, wrapper: HTMLElement, jbBox: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        wrapper.classList.remove('jb-focused');
        if (target.value === '') {
            wrapper.classList.remove('jb-has-value');
        } else {
            wrapper.classList.add('jb-has-value');
        }
        validate(jbBox, target, helper, wrapper);
    }

    function getError(jbTextbox: HTMLElement, type: string) {
        return <HTMLElement>jbTextbox.querySelector(`error[${type}]`);
    }

    function error(jbBox: HTMLElement, helper: HTMLElement, wrapper: HTMLElement, type: string) {
        var err = getError(jbBox, type);
        helper.innerHTML = err ? err.innerHTML : 'Invalid Input';
        wrapper.classList.add('jb-error');
    }

    function validate(jbBox: HTMLElement, input: HTMLInputElement, helper: HTMLElement, wrapper: HTMLElement) {
        function e(type: string) { error(jbBox, helper, wrapper, type) }
        var v = input.validity;
        if (v.badInput) {
            return e('bad');
        } else if (v.customError) {
            return e('custom');
        } else if (v.valueMissing) {
            return e('required');
        } else if (v.patternMismatch) {
            return e('pattern');
        } else if (v.rangeOverflow) {
            return e('max');
        } else if (v.rangeUnderflow) {
            return e('min');
        } else if (v.stepMismatch) {
            return e('step');
        } else if (v.tooLong) {
            return e('maxlength');
        } else if (v.typeMismatch) {
            return e('type');
        } else {
            var jbHelper = jbBox.getElementsByTagName('helper');
            helper.innerHTML = jbHelper.length > 0 ? jbHelper[0].innerHTML : '&nbsp;';
            wrapper.classList.remove('jb-error');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var css = '$jb-css-styles';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        var jbTextboxes = document.getElementsByTagName('jb-textbox');
        console.log(jbTextboxes.length);
        for (var i = jbTextboxes.length - 1; i >= 0; i--) {
            let jb = <HTMLElement>jbTextboxes[i];
            createTextbox(jb);
            jb.parentNode.removeChild(<any>jb);
        }
    });
})();