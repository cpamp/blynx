import { Component } from "./Component";
import { ComponentRegistry } from "./ComponentRegistry";

export { Component }

document.addEventListener('DOMConentLoaded', function() {
    ComponentRegistry.init();
});