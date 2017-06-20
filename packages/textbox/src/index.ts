(function() {
    const defaultColor = '#2196F3';
    const lightGrey = '#878787';
    const inputColor = "#1E1E1E";
    const red = "#FF1744";
    const ease = "ease-in-out";
    const duration = "0.25s";
    const marginUnfocused = "1px";
    const borderUnfocused = `${lightGrey} solid 1px`;
    const borderError = `${red} solid 2px`;
    const labelTextSize = ".85em";
    const helperTextSize = ".75em";

    function createTextbox(jbTextbox: HTMLElement) {
        var wrapper = setupWrapper();
        var label = setupLabel(jbTextbox);
        var helper = setupHelper(jbTextbox);
        var input = setupInput(jbTextbox, label, helper);

        wrapper.appendChild(input);
        input.parentNode.insertBefore(label, input);
        input.parentNode.insertBefore(helper, input.nextSibling);
        jbTextbox.parentNode.insertBefore(wrapper, jbTextbox);
    }

    function setupWrapper(): HTMLElement {
        var wrapper = document.createElement('div');
        wrapper.style.position = "relative";
        wrapper.style.marginTop = "28px";
        return wrapper;
    }

    const ignoreAttrs = ['color', 'placeholder'];

    function copyAttributes(from: HTMLElement, to: HTMLElement) {
        for (var i = 0; i < from.attributes.length; i++) {
            let attr = from.attributes.item(i);
            if (ignoreAttrs.indexOf(attr.nodeName) === -1) to.setAttribute(attr.nodeName, attr.nodeValue);
        }
    }

    function setupHelper(jbTextbox: HTMLElement): HTMLElement {
        var helper = document.createElement('div');
        helper.style.paddingTop = "8px";
        helper.style.color = lightGrey;
        helper.style.fontSize = helperTextSize;
        var jbHelper = jbTextbox.getElementsByTagName('helper');
        helper.innerHTML = jbHelper.length > 0 ? jbHelper[0].innerHTML : '&nbsp;';
        return helper;
    }

    function setupInput(jbTextbox: HTMLElement, label: HTMLElement, helper: HTMLElement): HTMLElement {
        var input = document.createElement('input');
        copyAttributes(jbTextbox, input);
        input.onfocus = function(e) { focused(e, label, helper, jbTextbox); };
        input.onblur = function(e) { blurred(e, label, helper, jbTextbox); };
        input.style.border = "none";
        input.style.background = "transparent";
        input.style.borderBottom = borderUnfocused;
        input.style.marginBottom = marginUnfocused;
        input.style.outline = "none";
        input.style.paddingBottom = "8px";
        input.style.transition = `border-color ${duration} ${ease}`;
        input.style.color = inputColor;
        return input
    }

    function setupLabel(jbTextbox: HTMLElement): HTMLElement {
        var label = document.createElement('label');
        label.appendChild(document.createTextNode(jbTextbox.getAttribute('placeholder') || ''));
        label.style.color = lightGrey;
        label.style.position = "absolute";
        label.style.left = "0px";
        label.style.top = "0px";
        label.style.fontSize = "1em";
        label.style.transition = `all ${duration} ${ease}`;
        return label;
    }

    function focused(e: FocusEvent, label: HTMLElement, helper: HTMLElement, jbBox: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        var color = jbBox.getAttribute('color') || defaultColor;
        target.style.borderBottom = `solid ${color} 2px`;
        target.style.marginBottom = "0px";
        label.style.color = color;
        label.style.top = "-19px";
        label.style.fontSize = labelTextSize;
    }

    function blurred(e: FocusEvent, label: HTMLElement, helper: HTMLElement, jbBox: HTMLElement) {
        var target = <HTMLInputElement>e.target;
        target.style.borderBottom = borderUnfocused;
        target.style.marginBottom = marginUnfocused;
        if (target.value === '') {
            label.style.color = lightGrey;
            label.style.top = "0px";
            label.style.fontSize = "1em";
        }
        validate(jbBox, target, helper);
    }

    function getError(jbTextbox: HTMLElement, type: string) {
        return <HTMLElement>jbTextbox.querySelector(`error[${type}]`);
    }

    function error(jbBox: HTMLElement, input: HTMLInputElement, helper: HTMLElement, type: string) {
        var err = getError(jbBox, type);
        helper.innerHTML = err ? err.innerHTML : 'Invalid Input';
        input.style.borderBottom = borderError;
        input.style.marginBottom = "0px";
        helper.style.color = red;
    }

    function validate(jbBox: HTMLElement, input: HTMLInputElement, helper: HTMLElement) {
        function e(type: string) { error(jbBox, input, helper, type) }
        if (input.validity.badInput) {
            return e('bad');
        } else if (input.validity.customError) {
            return e('custom');
        } else if (input.validity.valueMissing) {
            return e('required');
        } else if (input.validity.patternMismatch) {
            return e('pattern');
        } else if (input.validity.rangeOverflow) {
            return e('max');
        } else if (input.validity.rangeUnderflow) {
            return e('min');
        } else if (input.validity.stepMismatch) {
            return e('step');
        } else if (input.validity.tooLong) {
            return e('maxlength');
        } else if (input.validity.typeMismatch) {
            return e('type');
        } else {
            var jbHelper = jbBox.getElementsByTagName('helper');
            helper.innerHTML = jbHelper.length > 0 ? jbHelper[0].innerHTML : '&nbsp;';
            helper.style.color = lightGrey;
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