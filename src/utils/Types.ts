
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

export interface Algo {
    start(): void;
    sort(arr: LineType[]): void;
    getTimeComplexity(): string;
    getSpaceComplexity(): string;
    getName(): string;
    getDescription(): string;
    getJavaCode(): string;
    getJavascriptCode(): string;
    getPythonCode(): string;
    getCCode(): string;
}

export interface ApplicationState {
    currentState: APPLICATION_STATE;
    selectedAlgo: string;
    currentPrimary: number;
    currentSecondary: number;
}