import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Collection } from "../../collection";


@TestClass()
export class IterableTests {
    testCollection = new Collection<number>(1,2,2,3,4,15,6,6,7,8)
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

    //#region contains
    get containsCollection() {
        return new Collection(
            {id: 1},
            {id: 2},
            {id: 3}
        )
    }

    @TestMethod()
    'contains() object by reference pass'(assert: Assert) {
        let collection = this.containsCollection;
        let result = collection.contains(collection[0]);
        assert.areEqual(true, result);
    }

    @TestMethod()
    'contains() object by reference fail'(assert: Assert) {
        let collection = this.containsCollection;
        let result = collection.contains({id: 1});
        assert.areEqual(false, result);
    }
    //#endregion

    //#region copy
    get copyCollection() {
        return new Collection(
            1, 2, 3, 4, 5
        )
    }
    get copySparseCollection() {
        let result = new Collection<number>(999);
        result.push(1000);
        return result;
    }

    @TestMethod()
    'copy() dense collection'(assert: Assert) {
        let control = this.copyCollection;
        let copied = this.copyCollection.copy();
        assert.areEqual(control.length, copied.length);
        for (let i = 0; i < copied.length; i++) {
            assert.areEqual(control[i], copied[i]);
        }
    }

    @TestMethod()
    'copy() sparse collection'(assert: Assert) {
        let control = this.copySparseCollection;
        let copied = this.copySparseCollection.copy();
        assert.areEqual(1, copied.length);
        assert.areEqual(1000, copied[0]);
        assert.areNotEqual(control.length, copied.length);
    }
    //#endregion

    //#region count
    @TestMethod()
    'count()'(assert: Assert) {
        assert.areEqual(this.testCollection.length, this.testCollection.count());
    }
    //#endregion

    //#region equals
    @TestMethod()
    'equals() pass'(assert: Assert) {
        let result = this.testCollection.equals(this.testCollection);
        assert.areEqual(true, result);
    }

    @TestMethod()
    'equals() fail'(assert: Assert) {
        let result = this.testCollection.equals(this.testEmptyCollection);
        assert.areEqual(false, result);
    }

    @TestMethod()
    'equals() comparer pass'(assert: Assert) {
        let result = this.testCollection.equals(this.testCollection, (num: number, num2: number) => {
            return num === num2;
        });
        assert.areEqual(true, result);
    }

    @TestMethod()
    'equals() comparer fail'(assert: Assert) {
        let result = this.testCollection.equals(this.testEmptyCollection, (num: number, num2: number) => {
            return num === num2;
        });
        assert.areEqual(false, result);
    }
    //#endregion

    //#region insert
    get insertCollection() {
        return new Collection(
            1, 2, 3, 4, 5
        )
    }

    @TestMethod()
    'insert() first'(assert: Assert) {
        let collection = this.insertCollection;
        collection.insert(0, 0);
        assert.areEqual(0, collection[0]);
    }

    @TestMethod()
    'insert() at last current index'(assert: Assert) {
        let collection = this.insertCollection;
        collection.insert(4, 6);
        assert.areEqual(6, collection[4]);
    }

    @TestMethod()
    'insert() index > length'(assert: Assert) {
        let collection = this.insertCollection;
        collection.insert(100, 6);
        assert.areEqual(6, collection[5]);
    }
    //#endregion

    //#region max
    @TestMethod()
    'max()'(assert: Assert) {
        let result = this.testCollection.max();
        assert.areEqual(15, result);
    }

    @TestMethod()
    'max() default'(assert: Assert) {
        let result = this.testEmptyCollection.max(10);
        assert.areEqual(10, result);
    }

    @TestMethod()
    'max() throws'(assert: Assert) {
        try {
            this.testEmptyCollection.max();
            assert.fail();
        } catch {
            assert.pass();
        }
    }

    @TestMethod()
    'max() selector'(assert: Assert) {
        let result = this.testCollection.max(num => num * 10);
        assert.areEqual(150, result.value);
        assert.areEqual(15, result.item);
    }

    @TestMethod()
    'max() selector default'(assert: Assert) {
        let result = this.testEmptyCollection.max(num => num * 10, {value: 200, item: 0});
        assert.areEqual(200, result.value);
        assert.areEqual(0, result.item);
    }

    @TestMethod()
    'max() selector throws'(assert: Assert) {
        try {
            this.testEmptyCollection.max(num => num * 10);
            assert.fail();
        } catch {
            assert.pass();
        }
    }
    //#endregion

    //#region min
    @TestMethod()
    'min()'(assert: Assert) {
        let result = this.testCollection.min();
        assert.areEqual(1, result);
    }

    @TestMethod()
    'min() default'(assert: Assert) {
        let result = this.testEmptyCollection.min(10);
        assert.areEqual(10, result);
    }

    @TestMethod()
    'min() throws'(assert: Assert) {
        try {
            this.testEmptyCollection.min();
            assert.fail();
        } catch {
            assert.pass();
        }
    }

    @TestMethod()
    'min() selector'(assert: Assert) {
        let result = this.testCollection.min(num => num * 10);
        assert.areEqual(10, result.value);
        assert.areEqual(1, result.item);
    }

    @TestMethod()
    'min() selector default'(assert: Assert) {
        let result = this.testEmptyCollection.min(num => num * 10, {value: 200, item: 0});
        assert.areEqual(200, result.value);
        assert.areEqual(0, result.item);
    }

    @TestMethod()
    'min() selector throws'(assert: Assert) {
        try {
            this.testEmptyCollection.min(num => num * 10);
            assert.fail();
        } catch {
            assert.pass();
        }
    }
    //#endregion

    //#region prepend
    @TestMethod()
    'prepend()'(assert: Assert) {
        let collection = new Collection(1,2,3,4,5);
        collection.prepend(0);
        assert.areEqual(0, collection[0]);
    }
    //#endregion

    //#region remove & removeAt
    get removeCollection() {
        return new Collection(1,2,3,4,5);
    }

    @TestMethod()
    'remove()'(assert: Assert) {
        let collection = this.removeCollection;
        collection.remove(1);
        assert.areEqual(2, collection[0]);
        assert.areEqual(4, collection.length);
    }

    @TestMethod()
    'remove() predicate'(assert: Assert) {
        let collection = this.removeCollection;
        collection.remove(num => num % 2 === 0);
        assert.areEqual(3, collection.length);
        assert.areEqual(1, collection[0]);
    }

    @TestMethod()
    'removeAt()'(assert: Assert) {
        let collection = this.removeCollection;
        collection.removeAt(0);
        assert.areEqual(4, collection.length);
        assert.areEqual(2, collection[0]);
    }
    //#endregion

    //#region sum
    get sumCollection() {
        return new Collection(2,2,2,2,2,10)
    }

    @TestMethod()
    'sum()'(assert: Assert) {
        let result = this.sumCollection.sum();
        assert.areEqual(20, result);
    }

    @TestMethod()
    'sum() selector'(assert: Assert) {
        let result = this.sumCollection.sum(num => num * 10);
        assert.areEqual(200, result);
    }
    //#endregion
}