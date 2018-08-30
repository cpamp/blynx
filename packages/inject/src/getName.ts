import { NameProperty } from "./constants";

export function getName(target: Function): string {
    if (typeof target === 'object') {
        return (<any>target).toString().match(/^\[object\s([^\s\]]+)\]/)[1];
    }
    return (<any>target)[NameProperty] || (<any>target).name || (<any>target).toString().match(/^function\s*([^\s(]+)/)[1];
}