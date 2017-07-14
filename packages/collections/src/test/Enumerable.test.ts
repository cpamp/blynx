import { TestClass, TestMethod, Assert } from "@jable/test/dist/commonjs";
import { Enumerable } from "../Enumerable";

@TestClass()
export class EnumerableTest {
    @TestMethod()
    public All_True(assert: Assert) {
        let arr = [2,4,6,8,10];
        assert.AreEqual(true, Enumerable.All(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public All_False(assert: Assert) {
        let arr = [2,4,6,8,9];
        assert.AreEqual(false, Enumerable.All(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public Any_True(assert: Assert) {
        let arr = [3,6,11,13];
        assert.AreEqual(true, Enumerable.Any(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public Any_False(assert: Assert) {
        let arr = [3,5,7];
        assert.AreEqual(false, Enumerable.Any(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public Average_SameElement(assert: Assert) {
        let arr = [2,2,2,2,2];
        assert.AreEqual(2, Enumerable.Average(arr));
    }

    @TestMethod()
    public Average_Object(assert: Assert) {
        let arr = [{a:10}, {a: 0}]
        assert.AreEqual(5, Enumerable.Average(arr, (item) => item.a));
    }

    @TestMethod()
    public Concat_2(assert: Assert) {
        let arr = [1,2,3,4,5];
        let arr2 = [1,2,3,4,5];
        assert.AreEqual(10, Enumerable.Concat(arr, arr2).length);
        assert.AreEqual(1, Enumerable.Concat(arr, arr2)[5]);
    }

    @TestMethod()
    public Contains_Number_True(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(true, Enumerable.Contains(arr, 5));
    }

    @TestMethod()
    public Contains_Number_False(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(false, Enumerable.Contains(arr, -1));
    }

    @TestMethod()
    public Contains_Object_True(assert: Assert) {
        let obj = {};
        let arr = [[], obj];
        assert.AreEqual(true, Enumerable.Contains(arr, obj));
    }

    @TestMethod()
    public Contains_Object_False(assert: Assert) {
        let obj = {};
        let arr = [[], {}];
        assert.AreEqual(false, Enumerable.Contains(arr, obj));
    }

    @TestMethod()
    public Contains_Object_Equality(assert: Assert) {
        let arr = [{a:200}, {}];
        assert.AreEqual(true, Enumerable.Contains(arr, {a: 200}, (a: any, b: any) => a.a === b.a));
    }

    @TestMethod()
    public Count(assert: Assert) {
        let arr = [1,2,3,4];
        assert.AreEqual(4, Enumerable.Count(arr));
    }

    @TestMethod()
    public Distinct_Number(assert: Assert) {
        let arr = [1,1,2,2,3,3,4,4];
        assert.AreEqual(4, Enumerable.Distinct(arr).length);
        assert.AreEqual(1, Enumerable.Distinct(arr)[0]);
        assert.AreEqual(2, Enumerable.Distinct(arr)[1]);
        assert.AreEqual(3, Enumerable.Distinct(arr)[2]);
        assert.AreEqual(4, Enumerable.Distinct(arr)[3]);
    }

    @TestMethod()
    public Distinct_Equality(assert: Assert) {
        let arr = [{a: 1}, {a: 2}, {a: 2}, {a: 3}, {a: 2}];
        assert.AreEqual(3, Enumerable.Distinct(arr, (a: any, b: any) => a.a === b.a).length);
    }

    @TestMethod()
    public ElementAt_InBounds(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(4, Enumerable.ElementAt(arr, 3));
    }

    @TestMethod()
    public ElementAtOrDefault_OutOfBounds(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(null, Enumerable.ElementAtOrDefault(arr, 5));
    }

    @TestMethod()
    public Except_Number(assert: Assert) {
        let arr = [6,6,1,2,3,4,6,5];
        let not = [6, 5];
        assert.AreEqual(4, Enumerable.Except(arr, not).length);
        assert.AreEqual(true, Enumerable.Except(arr, not).indexOf(6) === -1);
        assert.AreEqual(true, Enumerable.Except(arr, not).indexOf(5) === -1);
    }

    @TestMethod()
    public First_Number(assert: Assert) {
        let arr = [1,2,3,4];
        assert.AreEqual(1, Enumerable.First(arr));
    }

    @TestMethod()
    public FirstOrDefault(assert: Assert) {
        let arr: any[] = [];
        assert.AreEqual(null, Enumerable.FirstOrDefault(arr));
    }
}