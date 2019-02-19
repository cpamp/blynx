import { Component } from "./Component";
import { ComponentRegistry } from "./ComponentRegistry";

export { Component }

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ComponentRegistry.init();
    });
} else {
    setTimeout(function() { ComponentRegistry.init(); }, 1);
}