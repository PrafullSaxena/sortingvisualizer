import { Settings, Elements, APPLICATION_STATE } from "../utils/Types";
import { ALGORITHMS } from "./AppContants";

export let InitialSettings: Settings = {
    speed: 0,
    maxSpeed: 1000,
    minSpeed: 0,
    arraySize: 10,
    arraySizeMin: 20,
    arraySizeCap: 1000
}

export const initialElements: Elements = {
    lines: []
}

export const initialApplicationState = {
    currentState: APPLICATION_STATE.IDEAL,
    selectedAlgo: ALGORITHMS.MERGE_SORT,
    currentPrimary: -1,
    currentSecondary: -1
}