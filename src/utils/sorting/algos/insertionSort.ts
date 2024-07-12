import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";

export class InsertionSort implements Algo {
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
        let n = arr.length;

        for (let i = 1; i < n; i++) {
            let current = { ...arr[i] };
            let j = i - 1;

            this.dispatch(changePrimaryIndex(i));

            while (j >= 0 && arr[j].height > current.height) {

                this.dispatch(updateElements([...arr]));
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

                arr[j + 1] = { ...arr[j] };
                j--;

                this.dispatch(updateElements([...arr]));
            }

            arr[j + 1] = { ...current };
            this.dispatch(changeSecondaryIndex(j + 1));
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
            this.dispatch(updateElements([...arr]));
        }

        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    getTimeComplexity(): string {
        return "O(n^2)";
    }

    getSpaceComplexity(): string {
        return "O(1)";
    }

    getName(): string {
        return "Insertion Sort";
    }

    getDescription(): string {
        return "Insertion Sort is an in-place comparison-based sorting algorithm. It builds the final sorted array one item at a time, with each iteration moving an element to its appropriate position.";
    }

    getJavaCode(): string {
        return `
public class InsertionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`;
    }

    getJavascriptCode(): string {
        return `
function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`;
    }

    getPythonCode(): string {
        return `
def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Unsorted array: \\n");
    printArray(arr, n);
    insertionSort(arr, n);
    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`;
    }
}
