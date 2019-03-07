import { Collection } from "../Collection";
import { TestClass, TestMethod, Assert } from "@blynx/test";
import { IGroup } from "../IGroup";

@TestClass()
export class QueryableTests {
    testCollection = new Collection<number>(1,2,2,3,4,5,6,6,7,8)
    testEmptyCollection = new Collection<number>();

    //#region Prototypes
    @TestMethod()
    testIsCollection(assert: Assert) {
        assert.areEqual(true, Collection.isCollection(this.testCollection));
        assert.areEqual(false, Collection.isCollection([]));
    }
    //#endregion

    //#region distinct
    @TestMethod()
    testDistinct(assert: Assert) {
        let distinct = this.testCollection.distinct();
        assert.areEqual(8, distinct.length);
        assert.areNotEqual(this.testCollection.length, distinct.length);
    }

    @TestMethod()
    testDistinctComparer(assert: Assert) {
        let collection = new Collection({id: 1}, {id: 2}, {id: 2}, {id: 3}, {id: 3}, {id: 4}, {id: 5});
        let distinct = collection.distinct((a: any, b: any) => a.id === b.id);
        assert.areEqual(5, distinct.length);
        assert.areNotEqual(collection.length, distinct.length);
    }
    //#endregion

    //#region first
    @TestMethod()
    First(assert: Assert) {
        assert.areEqual(1, this.testCollection.first());
    }

    @TestMethod()
    FirstDefault(assert: Assert) {
        assert.areEqual(10, this.testEmptyCollection.first(10));
    }

    @TestMethod()
    FirstDefaultThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first();
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    FirstPredicate(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 5));
    }

    @TestMethod()
    FirstPredicateDefaultEmpty(assert: Assert) {
        assert.areEqual(5, this.testEmptyCollection.first(num => num === 1, 5));
    }

    @TestMethod()
    FirstPredicateDefaultNotFound(assert: Assert) {
        assert.areEqual(5, this.testCollection.first(num => num === 1000, 5));
    }

    @TestMethod()
    FirstPredicateEmptyThrows(assert: Assert) {
        try {
            this.testEmptyCollection.first(num => num === 1);
            assert.fail();
        } catch (err) {
            assert.isNotNull(err);
        }
    }

    @TestMethod()
    FirstPredicateNotFoundThrows(assert: Assert) {
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
    GroupByOne(assert: Assert) {
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
    GroupByTwoComparer(assert: Assert) {
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
            {id: 1, name: 'Apple', foodType: 1},
            {id: 2, name: 'Broccoli', foodType: 2},
            {id: 3, name: 'Potato', foodType: 2},
            {id: 4, name: 'Chicken', foodType: 3},
            {id: 5, name: 'Orange', foodType: 1}
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
    InnerJoinTest(assert: Assert) {
        let food = this.innerJoinFood,
            foodTypes = this.innerJoinFoodTypes;

        let result = food.innerJoin()
    }
    //#endregion

}