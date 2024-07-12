import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";


export class QuickSort implements Algo {

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
        await this.quickSort(arr, 0, arr.length - 1);
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    async quickSort(arr: LineType[], low: number, high: number): Promise<void> {
        if (low < high) {
            const partitionIndex = await this.partition(arr, low, high);

            await this.quickSort(arr, low, partitionIndex - 1);
            await this.quickSort(arr, partitionIndex + 1, high);
        }
    }

    async partition(arr: LineType[], low: number, high: number): Promise<number> {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            // Dispatch action to highlight current partition (optional for visualization)
            this.dispatch(changePrimaryIndex(high));
            this.dispatch(changeSecondaryIndex(j));

            if (arr[j].height < pivot.height) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];

                // Dispatch action to update Redux state with visual changes
                this.dispatch(updateElements([...arr]));

                // Delay for visualization (adjust as needed)
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        // Dispatch action to update Redux state with visual changes
        this.dispatch(updateElements([...arr]));

        // Delay for visualization (adjust as needed)
        await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

        return i + 1;
    }

    getTimeComplexity(): string {
        return "O(n log n)";
    }

    getSpaceComplexity(): string {
        return "O(log n)";
    }

    getName(): string {
        return "Quick Sort";
    }

    getDescription(): string {
        return "Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.";
    }

    getJavaCode(): string {
        return `
public class QuickSort {
    int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    void sort(int arr[], int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
}`;
    }

    getJavascriptCode(): string {
        return `
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`;
    }

    getPythonCode(): string {
        return `
def quick_sort(arr, low = 0, high = None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Unsorted array: \\n");
    printArray(arr, n);
    quickSort(arr, 0, n - 1);
    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`;
    }
}
