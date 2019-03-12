import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Collection } from "../";
import { ICollectionOptions } from "../collectionOptions";

@TestClass()
export class CollectionTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8);

    @TestMethod()
    'Collection.isCollection()'(assert: Assert) {
        assert.areEqual(true, Collection.isCollection(this.testCollection));
        assert.areEqual(false, Collection.isCollection([]));
    }

    @TestMethod()
    'collection options defaults'(assert: Assert) {
        let collection = new Collection();
        assert.areEqual(true, collection.options.allowSetPrototypeOf);
    }

    //#region constructors
    @TestMethod()
    'constructor(length)'(assert: Assert) {
        let collection = new Collection(1000);
        assert.areEqual(1000, collection.length);
    }

    @TestMethod()
    'constructor(options)'(assert: Assert) {
        let collection = new Collection({allowSetPrototypeOf: false} as ICollectionOptions);
        assert.areEqual(false, collection.options.allowSetPrototypeOf);
    }

    @TestMethod()
    'constructor(options, args)'(assert: Assert) {
        let collection = new Collection({allowSetPrototypeOf: false} as ICollectionOptions, 1, 2, 3);
        assert.areEqual(false, collection.options.allowSetPrototypeOf);
        assert.areEqual(3, collection.length);
    }

    @TestMethod()
    'constructor(options, length)'(assert: Assert) {
        let collection = new Collection({allowSetPrototypeOf: false} as ICollectionOptions, 1000);
        assert.areEqual(false, collection.options.allowSetPrototypeOf);
        assert.areEqual(1000, collection.length);
    }

    @TestMethod()
    'constructor(args)'(assert: Assert) {
        let collection = new Collection(1, 2, 3, 4, 5);
        assert.areEqual(5, collection.length);
    }
    //#endregion
}