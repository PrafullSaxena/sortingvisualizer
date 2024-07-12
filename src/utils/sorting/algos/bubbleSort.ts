import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";



export class BubbleSort implements Algo {

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
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.dispatch(changePrimaryIndex(j));
                if (arr[j].height > arr[j + 1].height) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.dispatch(updateElements([...arr]))
                    this.dispatch(changeSecondaryIndex(j + 1));
                    await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
                }
            }
        }
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED))
    }

    getTimeComplexity(): string {
        return "O(n^2)";
    }

    getSpaceComplexity(): string {
        return "O(1)";
    }

    getName(): string {
        return "Bubble Sort";
    }

    getDescription(): string {
        return "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.";
    }

    getJavaCode(): string {
        return `
public class BubbleSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`;
    }

    getJavascriptCode(): string {
        return `
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`;
    }

    getPythonCode(): string {
        return `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Unsorted array: \\n");
    printArray(arr, n);
    bubbleSort(arr, n);
    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`;
    }
}
