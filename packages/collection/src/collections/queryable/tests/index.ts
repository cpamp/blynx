import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Collection } from "../../collection";
import { IGroup } from "../../group";

@TestClass()
export class QueryableTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8)
    testEmptyCollection = new Collection<number>();

    //#region distinct
    @TestMethod()
    'distinct()'(assert: Assert) {
        let distinct = this.testCollection.distinct();
        assert.areEqual(8, distinct.length);
        assert.areNotEqual(this.testCollection.length, distinct.length);
    }

    @TestMethod()
    'distinct() with comparer'(assert: Assert) {
        let collection = new Collection({id: 1}, {id: 2}, {id: 2}, {id: 3}, {id: 3}, {id: 4}, {id: 5});
        let distinct = collection.distinct((a: any, b: any) => a.id === b.id);
        assert.areEqual(5, distinct.length);
        assert.areNotEqual(collection.length, distinct.length);
    }
    //#endregion

    //#region first
    @TestMethod()
    'first()'(assert: Assert) {
        assert.areEqual(1, this.testCollection.first());
    }

    @TestMethod()
    'first() with default'(assert: Assert) {
        let result = this.testCollection.first(1000);
        assert.areEqual(1, result);
    }

    @TestMethod()
    'first() with default on empty collection'(assert: Assert) {
        assert.areEqual(10, this.testEmptyCollection.first(10));
    }

    @TestMethod()
    'first() on empty collection that throws'(assert: Assert) {
        try {
            this.testEmptyCollection.first();
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    'first() with predicate'(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 5));
    }

    @TestMethod()
    'first() with predicate and default on empty collection'(assert: Assert) {
        assert.areEqual(5, this.testEmptyCollection.first(num => num === 1, 5));
    }

    @TestMethod()
    'first() with predicate and default'(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 1000, 5));
    }

    @TestMethod()
    'first() with predicate on empty collection that throws'(assert: Assert) {
        try {
            this.testEmptyCollection.first(num => num === 1);
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    'first() with predicate that throws'(assert: Assert) {
        try {
            this.testCollection.first(num => num === 5000);
            assert.fail()
        } catch (err) {
            assert.isNotNull(err);
        }
    }
    //#endregion

    //#region gruopBy
    get groupByCollection() {
        return new Collection(
            {key: 5, value: 10},
            {key: 6, value: 50},
            {key: 45, value: 10},
            {key: 5, value: 10},
            {key: 45, value: 20}
        );
    }

    @TestMethod()
    'groupBy() with one key'(assert: Assert) {
        let collection = this.groupByCollection;
        let result = collection.groupBy((item: any) => {
            return item.key;
        });
        assert.areEqual(3, result.length);
        let key5Group: IGroup<any, any> | null = null;
        for (let item of result) {
            if (item.key === 5) {
                key5Group = item;
                break;
            }
        }
        assert.isNotNull(key5Group);
        if (key5Group !== null) assert.areEqual(2, key5Group.length);
    }

    @TestMethod()
    'groupBy() with two properties and comparer'(assert: Assert) {
        let collection = this.groupByCollection;
        let result: Collection<IGroup<any, any>> = collection.groupBy((item: any) => {
            return item;
        }, (key1, key2) => {
            return key1.key === key2.key && key1.value === key2.value;
        });
        assert.areEqual(4, result.length);
        assert.areEqual(2, result[0].length);
        assert.areEqual(10, result[0][0].value);
    }
    //#endregion

    //#region join
    get joinFood() {
        return new Collection(
            {id: 1, name: 'Apple', foodTypeId: 1},
            {id: 2, name: 'Broccoli', foodTypeId: 2},
            {id: 3, name: 'Potato', foodTypeId: 2},
            {id: 4, name: 'Chicken', foodTypeId: 3},
            {id: 5, name: 'Orange', foodTypeId: 1}
        )
    }
    get joinFoodTypes() {
        return new Collection(
            {id: 1, name: 'Fruit'},
            {id: 2, name: 'Vegetable'},
            {id: 3, name: 'Meat'}
        )
    }

    @TestMethod()
    'join()'(assert: Assert) {
        let food = this.joinFood,
            foodTypes = this.joinFoodTypes;

        let result = food.join(foodTypes, (food: any) => food.foodTypeId, (foodType: any) => foodType.id, (food: any, foodType: any) => {
            food.foodType = foodType;
            return food;
        });
        assert.areEqual(food.length, result.length);
        for (let food of result) {
            assert.areEqual(food.foodTypeId, food.foodType.id);
        }
    }

    @TestMethod()
    'join() with comparer'(assert: Assert) {
        let food = this.joinFood,
            foodTypes = this.joinFoodTypes;

        let result = food.join(foodTypes, (food: any) => food.foodTypeId, (foodType: any) => foodType.id, (food: any, foodType: any) => {
            food.foodType = foodType;
            return food;
        }, (id: any, id2: any) => id !== id2);
        assert.areEqual(10, result.length);
        for (let food of result) {
            assert.areNotEqual(food.foodTypeId, food.foodType.id);
        }
    }

    @TestMethod()
    'join() no args'(assert: Assert) {
        let result = new Collection().join();
        assert.areEqual('', result);
    }

    @TestMethod()
    'join() strings'(assert: Assert) {
        let result = new Collection('a', 'b', 'c').join(', ');
        assert.areEqual('a, b, c', result);
    }
    //#endregion

    //#region last
    @TestMethod()
    'last()'(assert: Assert) {
        let result = this.testCollection.last();
        assert.areEqual(8, result);
    }

    @TestMethod()
    'last() with default'(assert: Assert) {
        let result = this.testCollection.last(5);
        assert.areEqual(8, result);
    }

    @TestMethod()
    'last() with default on empty collection'(assert: Assert) {
        let result = this.testEmptyCollection.last(100);
        assert.areEqual(100, result);
    }

    @TestMethod()
    'last() on empty collection that throws'(assert: Assert) {
        try {
            this.testEmptyCollection.last();
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    'last() with predicate'(assert: Assert) {
        let result = this.testCollection.last((item: number) => item % 5 === 0);
        assert.areEqual(5, result);
    }

    @TestMethod()
    'last() with predicate and default on empty collection'(assert: Assert) {
        assert.areEqual(5, this.testEmptyCollection.first(num => num === 1, 5));
    }

    @TestMethod()
    'last() with predicate and default'(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 1000, 5));
    }

    @TestMethod()
    'last() with predicate on empty collection that throws'(assert: Assert) {
        try {
            this.testEmptyCollection.first(num => num === 1);
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    'last() with predicate that throws'(assert: Assert) {
        try {
            this.testCollection.first(num => num === 5000);
            assert.fail()
        } catch (err) {
            assert.isNotNull(err);
        }
    }
    //#endregion

    //#region orderBy & orderByDesc
    get orderByCollection() {
        return new Collection(
            { val: 1 },
            { val: 1000 },
            { val: 4 },
            { val: 5 },
            { val: 200 }
        )
    }

    @TestMethod()
    'orderBy()'(assert: Assert) {
        let result = this.orderByCollection.orderBy((item: any) => item.val);
        let last = -Infinity;
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last <= item.val);
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }

    @TestMethod()
    'orderByDesc()'(assert: Assert) {
        let result = this.orderByCollection.orderByDesc((item: any) => item.val);
        let last = Infinity;
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last >= item.val);
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }

    get orderByStringCollection() {
        return new Collection(
            { val: 'Zb' },
            { val: 'za' },
            { val: 'aa' },
            { val: 'a' },
            { val: 'aB' },
            { val: 'AB' },
            { val: 'Ab' }
        )
    }

    @TestMethod()
    'orderBy() with strings'(assert: Assert) {
        let result = this.orderByStringCollection.orderBy((item: any) => item.val);
        let last = '';
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last <= item.val)
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }

    @TestMethod()
    'orderByDesc() with strings'(assert: Assert) {
        let result = this.orderByStringCollection.orderByDesc((item: any) => item.val);
        let last = 'zzz';
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last >= item.val)
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }


    @TestMethod()
    'orderBy() with strings lowercase'(assert: Assert) {
        let result = this.orderByStringCollection.orderBy((item: any) => item.val.toLowerCase());
        let last = '';
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last.toLowerCase() <= item.val.toLowerCase())
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }

    @TestMethod()
    'orderByDesc() with strings lowercase'(assert: Assert) {
        let result = this.orderByStringCollection.orderByDesc((item: any) => item.val.toLowerCase());
        let last = 'ZZZ';
        for (let item of result as Collection<any>) {
            assert.areEqual(true, last.toLowerCase() >= item.val.toLowerCase())
            last = item.val;
        }
        assert.areEqual(true, result.length > 0);
    }
    //#endregion

    //#region limit
    @TestMethod()
    'limit() by zero'(assert: Assert) {
        let result = this.testCollection.limit(0);
        assert.areEqual(0, result.length);
    }

    @TestMethod()
    'limit() by 1'(assert: Assert) {
        let result = this.testCollection.limit(1);
        assert.areEqual(1, result.length);
    }

    @TestMethod()
    'limit() by n > length'(assert: Assert) {
        let result = this.testCollection.limit(1000);
        assert.areEqual(this.testCollection.length, result.length);
    }

    @TestMethod()
    'limit() by n == length'(assert: Assert) {
        let result = this.testCollection.limit(this.testCollection.length);
        assert.areEqual(this.testCollection.length, result.length);
    }
    //#endregion

    //#region select
    @TestMethod()
    'select()'(assert: Assert) {
        let result = this.testCollection.select(item => item * 10);
        for (let item of result) {
            assert.areEqual(true, item >= 10);
        }
        assert.areEqual(true, result.length === this.testCollection.length);
        assert.areEqual(true, result.length > 0);
    }
    //#endregion

    //#region skip
    @TestMethod()
    'skip()'(assert: Assert) {
        let result = this.testCollection.skip(4);
        assert.areEqual(this.testCollection.length - 4, result.length);
    }

    @TestMethod()
    'skip() negative'(assert: Assert) {
        let result = this.testCollection.skip(-1)
        assert.areEqual(this.testCollection.length, result.length);
    }

    @TestMethod()
    'skip() n > length'(assert: Assert) {
        let result = this.testCollection.skip(1000);
        assert.areEqual(0, result.length);
    }

    @TestMethod()
    'skip() n == length'(assert: Assert) {
        let result = this.testCollection.skip(this.testCollection.length);
        assert.areEqual(0, result.length);
    }
    //#endregion

    //#region union
    get unionCollection() {
        return new Collection<number>(
            1, 2, 3, 4, 5, 9
        )
    }

    @TestMethod()
    'union()'(assert: Assert) {
        let result = this.testCollection.union(this.unionCollection);
        assert.areEqual(9, result.length);
    }
    //#endregion

    //#region where
    @TestMethod()
    'where()'(assert: Assert) {
        let result = this.testCollection.where(x => x % 2 === 0);
        for (let item of result) {
            assert.areEqual(0, item % 2);
        }
        assert.areNotEqual(this.testCollection.length, result.length);
    }
    //#endregion

}