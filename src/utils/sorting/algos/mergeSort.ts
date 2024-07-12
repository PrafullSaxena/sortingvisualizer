import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType } from "../../Types";


export class MergeSort implements Algo {

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
        await this.mergeSort(arr, 0, arr.length - 1);
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    async mergeSort(arr: LineType[], left: number, right: number): Promise<void> {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            // Dispatch action to highlight current partition (optional for visualization)

            this.dispatch(changePrimaryIndex(mid));
            await this.mergeSort(arr, left, mid);

            await this.mergeSort(arr, mid + 1, right);

            await this.merge(arr, left, mid, right);
        }
    }

    async merge(arr: LineType[], left: number, mid: number, right: number): Promise<void> {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        const leftArr: LineType[] = [];
        const rightArr: LineType[] = [];

        for (let i = 0; i < n1; i++) {
            this.dispatch(changeSecondaryIndex(i));
            leftArr[i] = { ...arr[left + i] };
        }
        for (let j = 0; j < n2; j++) {
            this.dispatch(changeSecondaryIndex(j));
            rightArr[j] = { ...arr[mid + 1 + j] };
        }

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {

            if (leftArr[i].height <= rightArr[j].height) {
                arr[k] = { ...leftArr[i] };
                this.dispatch(changeSecondaryIndex(i));
                i++;
            } else {
                arr[k] = { ...rightArr[j] };
                this.dispatch(changeSecondaryIndex(j));
                j++;
            }
            k++;

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }

        while (i < n1) {
            arr[k] = { ...leftArr[i] };
            i++;
            k++;

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }

        while (j < n2) {
            arr[k] = { ...rightArr[j] };
            j++;
            k++;

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }
    }

    getTimeComplexity(): string {
        return "O(n log n)";
    }

    getSpaceComplexity(): string {
        return "O(n)";
    }

    getName(): string {
        return "Merge Sort";
    }

    getDescription(): string {
        return "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves.";
    }

    getJavaCode(): string {
        return `
public class MergeSort {
    void merge(int arr[], int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int L[] = new int[n1];
        int R[] = new int[n2];
        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
    void sort(int arr[], int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
}`;
    }

    getJavascriptCode(): string {
        return `
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}`;
    }

    getPythonCode(): string {
        return `
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    while left and right:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    return result + left + right`;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int arr_size = sizeof(arr) / sizeof(arr[0]);
    printf("Unsorted array: \\n");
    printArray(arr, arr_size);
    mergeSort(arr, 0, arr_size - 1);
    printf("Sorted array: \\n");
    printArray(arr, arr_size);
    return 0;
}`;
    }
}
