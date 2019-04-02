import { TestClass, TestMethod, Assert } from "@blynx/test";
import { FlagEnum } from "..";
import { FlagItem } from "../flagItem";

class ColorsEnum extends FlagEnum {
    black!: FlagItem
    white!: FlagItem
    green!: FlagItem
    red!: FlagItem
    blue!: FlagItem
    yellow!: FlagItem

    constructor() {
        super('black', 'white', 'green', 'red', 'blue', 'yellow') //guarantees order
    }
} 

class ColorsAutoEnum extends FlagEnum {
    black = <FlagItem>{}
    white = <FlagItem>{}
    green = <FlagItem>{}
    red = <FlagItem>{}
    blue = <FlagItem>{}
    yellow = <FlagItem>{}

    constructor() {
        super();
        FlagEnum.__init.call(this)
    }
} 

@TestClass()
export class FlagTests {
    colors = new ColorsEnum()
    black = 1<<1
    white = 1<<2
    green = 1<<3
    red = 1<<4
    blue = 1<<5
    yellow = 1<<6

    @TestMethod()
    'has() number'(assert: Assert) {
        let blackAndWhite = FlagEnum.join(this.colors.white, this.colors.black);
        assert.areEqual(true, blackAndWhite.has(1<<1))
        assert.areEqual(true, blackAndWhite.has(1<<2))
        assert.areEqual(false, blackAndWhite.hasAny(1<<3, 1<<4, 1<<5, 1<<6))
    }

    @TestMethod()
    'has() FlagItem'(assert: Assert) {
        let greenAndYellow = FlagEnum.join(this.colors.green, this.colors.yellow);
        assert.areEqual(true, greenAndYellow.has(this.colors.green))
        assert.areEqual(true, greenAndYellow.has(this.colors.yellow))
        assert.areEqual(false, greenAndYellow.hasAny(this.colors.black, this.colors.white, this.colors.red, this.colors.blue))
    }

    @TestMethod()
    'hasAll() number'(assert: Assert) {
        let redAndWhiteAndBlue = FlagEnum.join(this.colors.red, this.colors.white, this.colors.blue)
        assert.areEqual(true, redAndWhiteAndBlue.hasAll(this.red, this.white))
        assert.areEqual(true, redAndWhiteAndBlue.hasAll(this.red, this.white, this.blue))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.red, this.white, this.blue, this.green))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.blue, this.green))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.red, this.green, this.blue))
    }

    @TestMethod()
    'hasAll() FlagItem'(assert: Assert) {
        let redAndWhiteAndBlue = FlagEnum.join(this.colors.red, this.colors.white, this.colors.blue)
        assert.areEqual(true, redAndWhiteAndBlue.hasAll(this.colors.red, this.colors.white))
        assert.areEqual(true, redAndWhiteAndBlue.hasAll(this.colors.red, this.colors.white, this.colors.blue))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.colors.red, this.colors.white, this.colors.blue, this.colors.green))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.colors.blue, this.colors.green))
        assert.areEqual(false, redAndWhiteAndBlue.hasAll(this.colors.red, this.colors.green, this.colors.blue))
    }

    @TestMethod()
    'hasAny() number'(assert: Assert) {
        let redAndBlue = FlagEnum.join(this.colors.red, this.colors.blue)
        assert.areEqual(true, redAndBlue.hasAny(this.red))
        assert.areEqual(true, redAndBlue.hasAny(this.green, this.red, this.blue))
        assert.areEqual(false, redAndBlue.hasAny(this.green, this.black, this.white, this.yellow))
    }

    @TestMethod()
    'hasAny() FlagItem'(assert:Assert) {
        let redAndBlue = FlagEnum.join(this.colors.red, this.colors.blue)
        assert.areEqual(true, redAndBlue.hasAny(this.colors.red))
        assert.areEqual(true, redAndBlue.hasAny(this.colors.green, this.colors.red, this.colors.blue))
        assert.areEqual(false, redAndBlue.hasAny(this.colors.green, this.colors.black, this.colors.white, this.colors.yellow))
    }

    @TestMethod()
    'join()'(assert: Assert) {
        let colors = FlagEnum.join(this.colors.black, this.colors.blue, this.colors.green, this.colors.red, this.colors.white, this.colors.yellow)
        assert.areEqual(+colors, 
            +this.colors.black | +this.colors.blue | +this.colors.green | +this.colors.red | +this.colors.white | +this.colors.yellow)
    }

    @TestMethod()
    'constructor()'(assert: Assert) {
        let cVal = 0;
        for (let key in this.colors) {
            cVal |= +this.colors[key]
        }

        let auto = new ColorsAutoEnum()
        let aVal = 0;
        for (let key in auto) {
            aVal |= +auto[key]
        }

        assert.areEqual(cVal, aVal)
    }
}