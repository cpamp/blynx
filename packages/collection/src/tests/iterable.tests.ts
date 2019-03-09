import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Collection } from "../Collection";


@TestClass()
export class IterableTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8)
    testEmptyCollection = new Collection<number>();

    //#region all
    @TestMethod()
    'all() are number'(assert: Assert) {
        let result = this.testCollection.all(num => typeof num === 'number');
        assert.areEqual(true, result);
    }

    @TestMethod()
    'all() are not number'(assert: Assert) {
        let result = this.testCollection.all(num => typeof num !== 'number');
        assert.areEqual(false, result);
    }
    //#endregion

    //#region any
    @TestMethod()
    'any()'(assert: Assert) {
        let result = this.testCollection.any();
        assert.areEqual(true, result);
    }

    @TestMethod()
    'any() empty'(assert: Assert) {
        let result = this.testEmptyCollection.any();
        assert.areEqual(false, result);
    }

    @TestMethod()
    'any() are 2'(assert: Assert) {
        let result = this.testCollection.any(num => num === 2);
        assert.areEqual(true, result);
    }

    @TestMethod()
    'any() are 10'(assert: Assert) {
        let result = this.testCollection.any(num => num === 10);
        assert.areEqual(false, result);
    }
    //#endregion

    //#region average
    get averageCollection() {
        return new Collection(
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        )
    }

    @TestMethod()
    'average()'(assert: Assert) {
        let result = this.averageCollection.average();
        assert.areEqual(5.5, result);
    }

    @TestMethod()
    'average() evens'(assert: Assert) {
        let result = this.averageCollection.average(num => num % 2 === 0 ? num : 0);
        assert.areEqual(3, result);
    }
    //#endregion

    //#region clone
    get cloneCollection() {
        return new Collection(
            1, 2, 3, 4, 5
        )
    }
    get cloneSparseCollection() {
        let result = new Collection<number>(999);
        result.push(1000);
        return result;
    }

    @TestMethod()
    'clone() dense collection'(assert: Assert) {
        let control = this.cloneCollection;
        let cloned = this.cloneCollection.clone();
        assert.areEqual(control.length, cloned.length);
        for (let i = 0; i < cloned.length; i++) {
            assert.areEqual(control[i], cloned[i]);
        }
    }

    @TestMethod()
    'clone() sparse collection'(assert: Assert) {
        let control = this.cloneSparseCollection;
        let cloned = this.cloneSparseCollection.clone();
        assert.areEqual(1000, cloned.length);
        assert.areEqual(1000, cloned[999]);
        let count = 0;
        for (let key in cloned) {
            if (cloned.hasOwnProperty(key)) {
                assert.areEqual(control[key], cloned[key]);
                count++;
            }
        }
        assert.areEqual(1, count);
    }
    //#endregion
}