import { Collection } from "../Collection";
import { TestClass, TestMethod, Assert } from "@blynx/test";
import { IGroup } from "../IGroup";

@TestClass()
export class QueryableTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8)
    testEmptyCollection = new Collection<number>();

    //#region Prototypes
    @TestMethod()
    'Collection.isCollection()'(assert: Assert) {
        assert.areEqual(true, Collection.isCollection(this.testCollection));
        assert.areEqual(false, Collection.isCollection([]));
    }
    //#endregion

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

    //#region innerJoin
    get innerJoinFood() {
        return new Collection(
            {id: 1, name: 'Apple', foodTypeId: 1},
            {id: 2, name: 'Broccoli', foodTypeId: 2},
            {id: 3, name: 'Potato', foodTypeId: 2},
            {id: 4, name: 'Chicken', foodTypeId: 3},
            {id: 5, name: 'Orange', foodTypeId: 1}
        )
    }
    get innerJoinFoodTypes() {
        return new Collection(
            {id: 1, name: 'Fruit'},
            {id: 2, name: 'Vegetable'},
            {id: 3, name: 'Meat'}
        )
    }

    @TestMethod()
    'innerJoin()'(assert: Assert) {
        let food = this.innerJoinFood,
            foodTypes = this.innerJoinFoodTypes;

        let result = food.innerJoin(foodTypes, (food: any) => food.foodTypeId, (foodType: any) => foodType.id, (food: any, foodType: any) => {
            food.foodType = foodType;
            return food;
        });
        assert.areEqual(food.length, result.length);
        for (let food of result) {
            assert.areEqual(food.foodTypeId, food.foodType.id);
        }
    }

    @TestMethod()
    'innerJoin() with comparer'(assert: Assert) {
        let food = this.innerJoinFood,
            foodTypes = this.innerJoinFoodTypes;

        let result = food.innerJoin(foodTypes, (food: any) => food.foodTypeId, (foodType: any) => foodType.id, (food: any, foodType: any) => {
            food.foodType = foodType;
            return food;
        }, (id: any, id2: any) => id !== id2);
        assert.areEqual(10, result.length);
        for (let food of result) {
            assert.areNotEqual(food.foodTypeId, food.foodType.id);
        }
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
}