import { TestClass, TestMethod, Assert } from "@jable/test/dist/commonjs";
import { Enumerable } from "../Enumerable";

class CustomType {}

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
    public First_Number_Of(assert: Assert) {
        let arr = [1,3,5,6,8];
        assert.AreEqual(6, Enumerable.First(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public FirstOrDefault(assert: Assert) {
        let arr: any[] = [];
        assert.AreEqual(null, Enumerable.FirstOrDefault(arr));
    }

    @TestMethod()
    public FirstOrDefault_Of(assert: Assert) {
        let arr: any[] = [1,3,5,7];
        assert.AreEqual(null, Enumerable.FirstOrDefault(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public GroupBy(assert: Assert) {
        let arr = [
            {
                a: 20,
                b: 60,
                c: 0
            },
            {
                a: 20,
                b: 22,
                c: 0
            },
            {
                a: 20,
                b: 24,
                c: 0
            },
            {
                a: 20,
                b: 60,
                c: 0
            },
            {
                a: 20,
                b: 24,
                c: 0
            }
        ];

        assert.AreEqual(3, Enumerable.GroupBy(arr, (item) => {return {a: item.a, b: item.b}}).length);
        assert.AreEqual(20, Enumerable.GroupBy(arr, (item) => {return {a: item.a, b: item.b}})[0].a);
        assert.AreEqual(undefined, (<any>Enumerable.GroupBy(arr, (item) => {return {a: item.a, b: item.b}})[0]).c);
    }

    @TestMethod()
    public Intersect_Number(assert: Assert) {
        let arr = [1,2,3,4,5];
        let arr2 = [4,5,6,7,8];

        assert.AreEqual(2, Enumerable.Intersect(arr, arr2).length);
        assert.AreEqual(4, Enumerable.Intersect(arr, arr2)[0]);
        assert.AreEqual(5, Enumerable.Intersect(arr, arr2)[1]);
    }

    @TestMethod()
    public Join(assert: Assert) {
        let boxes = [{containerId: 1, name: "Box1"}, {containerId: 2, name: "Box2"}];
        let containers = [{containerId: 1, name: "Container 1"}, {containerId: 2, name: "Container 2"}];

        let joined = Enumerable.Join(boxes, containers, (box, container) => {
            return {
                containerId: container.containerId,
                containerName: container.name,
                boxName: box.name
            }
        }, (box, container) => box.containerId === container.containerId);

        assert.AreEqual(2, joined.length);

        assert.AreEqual(1, joined[0].containerId);
        assert.AreEqual("Container 1", joined[0].containerName);
        assert.AreEqual("Box1", joined[0].boxName);

        assert.AreEqual(2, joined[1].containerId);
        assert.AreEqual("Container 2", joined[1].containerName);
        assert.AreEqual("Box2", joined[1].boxName);
    }

    @TestMethod()
    public Last(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(5, Enumerable.Last(arr));
    }

    @TestMethod()
    public Last_Of(assert: Assert) {
        let arr = [2,4,6,8,9,11];
        assert.AreEqual(8, Enumerable.Last(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public LastOrDefault_Null(assert: Assert) {
        let arr: any[] = [];
        assert.AreEqual(null, Enumerable.LastOrDefault(arr));
    }

    @TestMethod()
    public LastOrDefault_Number(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(5, Enumerable.LastOrDefault(arr));
    }

    @TestMethod()
    public LastOrDefault_Null_Of(assert: Assert) {
        let arr: any[] = [];
        assert.AreEqual(null, Enumerable.LastOrDefault(arr, (item) => item %2 === 0));
    }

    @TestMethod()
    public LastOrDefault_Number_Of(assert: Assert) {
        let arr = [1,2,3,4,5];
        assert.AreEqual(4, Enumerable.LastOrDefault(arr, (item) => item % 2 === 0));
    }

    @TestMethod()
    public Max_Number(assert: Assert) {
        let arr = [111,12,3,15,0];
        assert.AreEqual(111, Enumerable.Max(arr));
    }

    @TestMethod()
    public Min_Number(assert: Assert) {
        let arr = [111,12,3,15,0];
        assert.AreEqual(0, Enumerable.Min(arr));
    }

    @TestMethod()
    public OfType(assert: Assert) {
        let arr = [1,23,new CustomType(), new CustomType()];
        assert.AreEqual(2, Enumerable.OfType(arr, CustomType).length);
    }

    @TestMethod()
    public OrderBy(assert: Assert) {
        let arr = [1,2,56,621,5643,1];
        let ordered = Enumerable.OrderBy(arr);
        assert.AreEqual(1, ordered[0]);
        assert.AreEqual(1, ordered[1]);
        assert.AreEqual(2, ordered[2]);
        assert.AreEqual(56, ordered[3]);
        assert.AreEqual(621, ordered[4]);
        assert.AreEqual(5643, ordered[5]);
    }

    @TestMethod()
    public OrderByDescending(assert: Assert) {
        let arr = [1,2,56,621,5643,1];
        let ordered = Enumerable.OrderByDescending(arr);
        assert.AreEqual(1, ordered[5]);
        assert.AreEqual(1, ordered[4]);
        assert.AreEqual(2, ordered[3]);
        assert.AreEqual(56, ordered[2]);
        assert.AreEqual(621, ordered[1]);
        assert.AreEqual(5643, ordered[0]);
    }

    @TestMethod()
    public Reverse(assert: Assert) {
        let arr = [1,5,2,4,3];
        let reversed = Enumerable.Reverse(arr);
        assert.AreEqual(3, reversed[0]);
        assert.AreEqual(4, reversed[1]);
        assert.AreEqual(2, reversed[2]);
        assert.AreEqual(5, reversed[3]);
        assert.AreEqual(1, reversed[4]);
    }
}