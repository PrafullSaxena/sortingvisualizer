import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";


// TODO: This algorithm is not yet implemented in the UI

export class RadixSort implements Algo {

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
        const max = this.getMax(arr);

        // Perform counting sort for every digit. Note that instead of passing digit number, 
        // exp is passed. exp is 10^i where i is the current digit number being processed.
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await this.countSort(arr, exp);
        }

        // Sorting finished, dispatch final state update
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    getMax(arr: LineType[]): number {
        let max = arr[0].height;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].height > max) {
                max = arr[i].height;
            }
        }
        return max;
    }

    async countSort(arr: LineType[], exp: number): Promise<void> {
        const n = arr.length;
        const output: LineType[] = new Array(n);
        const count: number[] = new Array(10).fill(0);

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            const index = Math.floor(arr[i].height / exp) % 10;
            count[index]++;
        }

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            const index = Math.floor(arr[i].height / exp) % 10;
            output[count[index] - 1] = { ...arr[i] };
            count[index]--;

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...output]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers according to current digit
        for (let i = 0; i < n; i++) {
            arr[i] = { ...output[i] };

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }
    }

    getTimeComplexity(): string {
        return "O(nk)";
    }

    getSpaceComplexity(): string {
        return "O(n+k)";
    }

    getName(): string {
        return "Radix Sort";
    }

    getDescription(): string {
        return "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value.";
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