import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType, AlgoStepType, Complexity } from "../../Types";

export class SelectionSort implements Algo {

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
            let minIndex = i;

            this.dispatch(changePrimaryIndex(i));

            for (let j = i + 1; j < n; j++) {
                this.dispatch(changeSecondaryIndex(j));
                if (arr[j].height < arr[minIndex].height) {
                    minIndex = j;
                }
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
                this.dispatch(updateElements([...arr]));
            }

            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                this.dispatch(changeSecondaryIndex(minIndex));
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
                this.dispatch(updateElements([...arr]));
            }
        }
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    getTimeComplexity(): Complexity {
        return {
            best: "O(n^2)",
            average: "O(n^2)",
            worst: "O(n^2)",
        };
    }

    getSpaceComplexity(): Complexity {
        return {
            best: "O(1)",
            average: "O(1)",
            worst: "O(1)",
        };
    }

    getName(): string {
        return "Selection Sort";
    }

    getDescription(): string {
        return "Selection Sort is an in-place comparison sort that divides the input into two parts: a sorted and an unsorted subarray. It repeatedly selects the smallest element from the unsorted subarray and moves it to the end of the sorted subarray.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted using Selection Sort.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Selection Sort",
                "description": "Sort the array using Selection Sort.",
                "steps": [
                    {
                        "title": "Iteration 1",
                        "description": "Find the smallest element and swap it with the first element.",
                        "array": [1, 7, 8, 9, 10, 5]
                    },
                    {
                        "title": "Iteration 2",
                        "description": "Find the smallest element in the remaining array and swap it with the second element.",
                        "array": [1, 5, 8, 9, 10, 7]
                    },
                    {
                        "title": "Iteration 3",
                        "description": "Find the smallest element in the remaining array and swap it with the third element.",
                        "array": [1, 5, 7, 9, 10, 8]
                    },
                    {
                        "title": "Iteration 4",
                        "description": "Find the smallest element in the remaining array and swap it with the fourth element.",
                        "array": [1, 5, 7, 8, 10, 9]
                    },
                    {
                        "title": "Iteration 5",
                        "description": "Find the smallest element in the remaining array and swap it with the fifth element.",
                        "array": [1, 5, 7, 8, 9, 10]
                    }
                ]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Selection Sort.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ]
    }

    getJavaCode(): string {
        return `
public class SelectionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`;
    }

    getJavascriptCode(): string {
        return `
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}`;
    }

    getPythonCode(): string {
        return `
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n-1; i++) {
        min_idx = i;
        for (j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Unsorted array: \\n");
    printArray(arr, n);
    selectionSort(arr, n);
    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`;
    }
}
