import { Component } from "./Component";
import { ComponentRegistry } from "./ComponentRegistry";

export { Component }

document.addEventListener('DOMContentLoaded', function() {
    ComponentRegistry.init();
});