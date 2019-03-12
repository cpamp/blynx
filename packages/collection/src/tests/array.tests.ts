import { TestMethod, TestClass, Assert } from "@blynx/test";
import { Collection } from "../collections/collection";

@TestClass()
export class ArrayTests {
    testCollection = new Collection(1, 2, 3, 4, 5);
    testCollectionNoSetProto = new Collection({allowSetPrototypeOf: false}, 1, 2, 3, 4, 5);

    getCollection() {
        return new Collection(...this.testCollection.slice());
    }

    getCollectionNoSetProto() {
        return new Collection(...this.testCollectionNoSetProto.slice());
    }

    @TestMethod()
    'arrays are unmodified'(assert: Assert) {
        let arr: any[] = [];
        assert.areEqual('undefined', typeof (<any>arr).inheritancenoop);
    }

    @TestMethod()
    'instanceof'(assert: Assert) {
        let collection = this.getCollection();
        let collection2 = this.getCollectionNoSetProto();
        assert.areEqual(collection.instanceof, collection instanceof Collection);
        assert.areEqual(collection2.instanceof, collection2 instanceof Collection);
        assert.areEqual(true, collection instanceof Array);
    }

    @TestMethod()
    'push()'(assert: Assert) {
        let collection = this.getCollection();
        collection.push(6);
        assert.areEqual(6, collection.length);
    }

    @TestMethod()
    'property assignment adjusts length'(assert: Assert) {
        let collection = this.getCollection();
        collection[5] = 6;
        collection[10] = 5;
        assert.areEqual(11, collection.length)
    }

    @TestMethod()
    'Array.isArray()'(assert: Assert) {
        let collection = this.getCollection();
        assert.areEqual(true, Array.isArray(collection));
    }

    @TestMethod()
    'for key in collection'(assert: Assert) {
        let collection = new Collection(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        for (let key in collection as any) {
            if (collection.hasOwnProperty(key)) {
                try {
                    let numKey = parseInt(key);
                    assert.areEqual(true, typeof numKey === 'number');
                    assert.areEqual(true, numKey <= 9);
                    assert.areEqual(true, numKey >= 0);
                } catch (err) {
                    assert.fail();
                }
            }
        }
    }
}