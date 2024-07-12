import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";

export class HeapSort implements Algo {

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

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(arr, n, i);
        }

        // Heap sort
        for (let i = n - 1; i > 0; i--) {
            // Swap root (max element) with the last element
            [arr[0], arr[i]] = [arr[i], arr[0]];

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

            // Heapify the reduced heap
            await this.heapify(arr, i, 0);
        }

        // Sorting finished, dispatch final state update
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    async heapify(arr: LineType[], n: number, i: number): Promise<void> {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // Dispatch action to highlight current element (optional for visualization)
        this.dispatch(changePrimaryIndex(i));

        // If left child is larger than root
        if (left < n && arr[left].height > arr[largest].height) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right].height > arr[largest].height) {
            largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            // Swap
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

            // Recursively heapify the affected sub-tree
            await this.heapify(arr, n, largest);
        }
    }

    getTimeComplexity(): string {
        return "O(n log n)";
    }

    getSpaceComplexity(): string {
        return "O(1)";
    }

    getName(): string {
        return "Heap Sort";
    }

    getDescription(): string {
        return "Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.";
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