export interface ICollectionOptions {
    allowSetPrototypeOf?: boolean;
}

export function setDefaultOptions(options: ICollectionOptions): ICollectionOptions {
    if (options.allowSetPrototypeOf === void 0) options.allowSetPrototypeOf = true;

    return options;
}

export function isCollectionOptions(options: ICollectionOptions) {
    return options.allowSetPrototypeOf !== void 0;
}