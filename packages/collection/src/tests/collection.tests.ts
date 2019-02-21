import { Collection } from "../Collection";
import { TestClass, TestMethod, Assert } from "@blynx/test";


@TestClass()
export class CollectionTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8)
    testEmptyCollection = new Collection<number>();

    //#region distinct
    @TestMethod()
    testDistinct(assert: Assert) {
        let distinct = this.testCollection.distinct();
        assert.areEqual(8, distinct.length);
        assert.areNotEqual(this.testCollection.length, distinct.length);
    }

    @TestMethod()
    testDistinctComparer(assert: Assert) {
        let distinct = this.testCollection.distinct((a, b) => {
            return a !== b && (a === 2 || a === 3)
        });
        assert.areEqual(2, distinct.length);
        assert.areEqual(true, distinct.indexOf(2) > -1);
        assert.areEqual(true, distinct.indexOf(3) > -1);
        assert.areNotEqual(this.testCollection.length, distinct.length);
    }
    //#endregion

    //#region first
    @TestMethod()
    public First(assert: Assert) {
        assert.areEqual(1, this.testCollection.first());
    }

    @TestMethod()
    public FirstDefault(assert: Assert) {
        assert.areEqual(10, this.testEmptyCollection.first(10));
    }

    @TestMethod()
    public FirstDefaultThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first();
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    public FirstPredicate(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 5));
    }

    @TestMethod()
    public FirstPredicateDefaultEmpty(assert: Assert) {
        assert.areEqual(5, this.testEmptyCollection.first(num => num === 1, 5));
    }

    @TestMethod()
    public FirstPredicateDefaultNotFound(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 1000, 5));
    }

    @TestMethod()
    public FirstPredicateEmptyThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first(num => num === 1);
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    public FirstPredicateNotFoundThrows(assert: Assert) {
        try {
            this.testCollection.first(num => num === 5000);
            assert.fail()
        } catch (err) {
            assert.isNotNull(err);
        }
    }
    //#endregion
}