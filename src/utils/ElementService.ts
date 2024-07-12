
import { InitialSettings } from "../data/InitialConfiguration";
import { CONSTANT } from "../data/AppContants";
import { LineType } from "./Types";

export class ElementService {

    constructor() {
        this.createAray(InitialSettings.arraySize)
    }

    public createAray(maxSize: number) {
        const randomArray: LineType[] = [];

        for (let i = 0; i < maxSize; i++) {
            const randomNum = Math.floor(Math.random() * (CONSTANT.MAX_LINE_HIGHT - CONSTANT.MIN_LINE_HIGHT + 1)) + CONSTANT.MIN_LINE_HIGHT;
            randomArray.push({
                height: randomNum,
                color: CONSTANT.LINE_COLOR
            });
        }

        return randomArray;
    }

}