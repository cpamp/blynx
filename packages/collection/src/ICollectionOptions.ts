export interface ICollectionOptions {
    allowSetPrototypeOf?: boolean;
}

export function setDefaultOptions(options: ICollectionOptions): ICollectionOptions {
    options.allowSetPrototypeOf = options.allowSetPrototypeOf || true;

    return options;
}

export function isCollectionOptions(options: ICollectionOptions) {
    return options.allowSetPrototypeOf !== void 0;
}