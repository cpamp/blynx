import { NameProperty } from "./constants";

export function getName(target: Function): string {
    return (<any>target)[NameProperty] || (<any>target).name;
}