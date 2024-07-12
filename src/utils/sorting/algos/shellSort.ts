
import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";


export class ShellSort implements Algo {

    private dispatch: AppDispatch;
    private elements: LineType[];

    constructor() {
        this.dispatch = store.dispatch;
        const linesArray = store.getState().elements.lines;
        this.elements = [...linesArray];
    }

    start(): void {
        this.sort(this.elements);
    }

    async sort(arr: LineType[]): Promise<void> {
        const n = arr.length;
        let gap = Math.floor(n / 2);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = { ...arr[i] };
                let j = i;

                // Dispatch action to highlight current element (optional for visualization)
                this.dispatch(changePrimaryIndex(i));

                while (j >= gap && arr[j - gap].height > temp.height) {
                    arr[j] = { ...arr[j - gap] };

                    // Dispatch action to update Redux state with visual changes
                    this.dispatch(updateElements([...arr]));

                    // Delay for visualization (adjust as needed)
                    await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

                    j -= gap;
                }

                arr[j] = { ...temp };

                // Dispatch action to update Redux state with visual changes
                this.dispatch(updateElements([...arr]));

                // Delay for visualization (adjust as needed)
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
            }
            gap = Math.floor(gap / 2);
        }

        // Sorting finished, dispatch final state update
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }



    getTimeComplexity(): string {
        return "O(n^2)";
    }

    getSpaceComplexity(): string {
        return "O(1)";
    }

    getName(): string {
        return "Shell Sort";
    }

    getDescription(): string {
        return "Shell Sort is an optimization over insertion sort. It starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. The final pass of Shell Sort is a plain insertion sort, but by then, the array of data is guaranteed to be almost sorted.";
    }

    getJavaCode(): string {
        return ``

    }

    getJavascriptCode(): string {
        throw new Error("Method not implemented.");
    }
    getPythonCode(): string {
        throw new Error("Method not implemented.");
    }
    getCCode(): string {
        throw new Error("Method not implemented.");
    }

}