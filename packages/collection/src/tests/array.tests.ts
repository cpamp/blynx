import { TestMethod, TestClass, Assert } from "@blynx/test";
import { Collection } from "../Collection";

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
    testArrayUnmodified(assert: Assert) {
        let arr: any[] = [];
        assert.areEqual('undefined', typeof (<any>arr).__extendnoop__);
    }

    @TestMethod()
    testInstanceof(assert: Assert) {
        let collection = this.getCollection();
        let collection2 = this.getCollectionNoSetProto();
        assert.areEqual(collection.instanceof, collection instanceof Collection);
        assert.areEqual(collection2.instanceof, collection2 instanceof Collection);
        assert.areEqual(true, collection instanceof Array);
    }

    @TestMethod()
    testPush(assert: Assert) {
        let collection = this.getCollection();
        collection.push(6);
        assert.areEqual(6, collection.length);
    }

    @TestMethod()
    testAssign(assert: Assert) {
        let collection = this.getCollection();
        collection[5] = 6;
        collection[10] = 5;
        assert.areEqual(11, collection.length)
    }

    @TestMethod()
    testIsArray(assert: Assert) {
        let collection = this.getCollection();
        assert.areEqual(true, Array.isArray(collection));
    }
}