import { NameProperty } from "./constants";

export function getName(target: Function): string {
    return (<any>target)[NameProperty] || (<any>target).name || (<any>target).toString().match(/^function\s*([^\s(]+)/)[1];
}