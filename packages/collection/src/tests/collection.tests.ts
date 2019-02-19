import { Collection } from "../Collection";
import { TestClass, TestMethod, Assert } from "@blynx/test";


@TestClass()
export class CollectionTests {
    testCollection = new Collection<number>(1,2,3,4,5,6,7,8)
    testEmptyCollection = new Collection<number>();

    @TestMethod()
    public First(assert: Assert) {
        assert.AreEqual(1, this.testCollection.first());
    }

    @TestMethod()
    public FirstDefault(assert: Assert) {
        assert.AreEqual(10, this.testEmptyCollection.first(10));
    }

    @TestMethod()
    public FirstDefaultThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first();
            assert.AreEqual(true, false);
        } catch (err) {
            assert.IsNotNull(err);
        }
    }

    @TestMethod()
    public FirstPredicate(assert: Assert) {
        assert.AreEqual(5, this.testCollection.first(num => num === 5));
    }

    @TestMethod()
    public FirstPredicateDefaultEmpty(assert: Assert) {
        assert.AreEqual(5, this.testEmptyCollection.first(num => num === 1, 5));
    }

    @TestMethod()
    public FirstPredicateDefaultNotFound(assert: Assert) {
        assert.AreEqual(5, this.testCollection.first(num => num === 1000, 5));
    }

    @TestMethod()
    public FirstPredicateEmptyThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first(num => num === 1);
            assert.AreEqual(true, false);
        } catch (err) {
            assert.IsNotNull(err);
        }
    }

    @TestMethod()
    public FirstPredicateNotFoundThrows(assert: Assert) {
        try {
            this.testCollection.first(num => num === 5000);
            assert.AreEqual(true, false);
        } catch (err) {
            assert.IsNotNull(err);
        }
    }
}