import { Settings, Elements, APPLICATION_STATE, ApplicationState } from "../utils/Types";
import { ALGORITHMS } from "./AppContants";

export const InitialSettings: Settings = {
    speed: 0,
    maxSpeed: 1000,
    minSpeed: 0,
    arraySize: 150,
    arraySizeMin: 20,
    arraySizeCap: 1000
}

export const initialElements: Elements = {
    lines: []
}

export const initialApplicationState: ApplicationState = {
    currentState: APPLICATION_STATE.IDEAL,
    selectedAlgo: ALGORITHMS.MERGE_SORT,
    currentPrimary: -1,
    currentSecondary: -1,
    modelOpen: false
}