import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Collection } from "src/Collection";

@TestClass()
export class CollectionTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8);

    @TestMethod()
    'Collection.isCollection()'(assert: Assert) {
        assert.areEqual(true, Collection.isCollection(this.testCollection));
        assert.areEqual(false, Collection.isCollection([]));
    }
}