
export interface LineType {
    height: number;
    color: string;
}

export interface singleLineType {
    index: number;
    height: number;
    color: string;
}

export interface Settings {
    speed: number;
    maxSpeed: number;
    minSpeed: number;
    arraySize: number;
    arraySizeMin: number;
    arraySizeCap: number;
}

export interface Elements {
    lines: LineType[];
}

export enum APPLICATION_STATE {
    IDEAL,
    RUNNING,
    PAUSED,
    FINISHED
}

export type AlgoStepType = {
    title?: string;
    description?: string;
    array?: number[];
    result?: number[];
    steps?: AlgoStepType[];
};

export interface Complexity {
    best: string;
    average: string;
    worst: string;
}

export interface Algo {
    start(): void;
    sort(arr: LineType[]): void;
    getTimeComplexity(): Complexity;
    getSpaceComplexity(): Complexity;
    getName(): string;
    getDescription(): string;
    getJavaCode(): string;
    getJavascriptCode(): string;
    getPythonCode(): string;
    getCCode(): string;
    getAlgoSteps(): AlgoStepType[];
}

export interface ApplicationState {
    currentState: APPLICATION_STATE;
    selectedAlgo: string;
    currentPrimary: number;
    currentSecondary: number;
    modelOpen: boolean;
}

