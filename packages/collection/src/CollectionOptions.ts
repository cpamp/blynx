export interface CollectionOptions {
    allowSetPrototypeOf: boolean;
}

export function setDefaultOptions(options: any): CollectionOptions {
    options.allowSetPrototypeOf = options.allowSetPrototypeOf || false;

    return options;
}

export function isCollectionOptions(options: CollectionOptions) {
    return options.allowSetPrototypeOf !== undefined;
}