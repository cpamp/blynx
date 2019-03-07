export interface ICollectionOptions {
    allowSetPrototypeOf: boolean;
}

export function setDefaultOptions(options: any): ICollectionOptions {
    options.allowSetPrototypeOf = options.allowSetPrototypeOf || false;

    return options;
}

export function isCollectionOptions(options: ICollectionOptions) {
    return options.allowSetPrototypeOf !== undefined;
}