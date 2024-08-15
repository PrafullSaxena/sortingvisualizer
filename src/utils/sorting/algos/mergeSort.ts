import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, AlgoStepType, Complexity, LineType } from "../../Types";


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

    getTimeComplexity(): Complexity {
        return {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        };
    }

    getSpaceComplexity(): Complexity {
        return {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)",
        };
    }

    getName(): string {
        return "Merge Sort";
    }

    getDescription(): string {
        return "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves.";
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class MergeSort {
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(array, 0, array.length - 1);
        System.out.println(Arrays.toString(array));
    }

    public static void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            int middle = (left + right) / 2;
            mergeSort(array, left, middle);
            mergeSort(array, middle + 1, right);
            merge(array, left, middle, right);
        }
    }

    public static void merge(int[] array, int left, int middle, int right) {
        int n1 = middle - left + 1;
        int n2 = right - middle;

        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        for (int i = 0; i < n1; i++)
            leftArray[i] = array[left + i];
        for (int i = 0; i < n2; i++)
            rightArray[i] = array[middle + 1 + i];

        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = leftArray[i];
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = rightArray[j];
            j++;
            k++;
        }
    }
}

        `
    }

    getJavascriptCode(): string {
        return `
function mergeSort(array) {
    if (array.length > 1) {
        const middle = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, middle);
        const rightHalf = array.slice(middle);

        mergeSort(leftHalf);
        mergeSort(rightHalf);

        let i = 0, j = 0, k = 0;
        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i] < rightHalf[j]) {
                array[k] = leftHalf[i];
                i++;
            } else {
                array[k] = rightHalf[j];
                j++;
            }
            k++;
        }

        while (i < leftHalf.length) {
            array[k] = leftHalf[i];
            i++;
            k++;
        }

        while (j < rightHalf.length) {
            array[k] = rightHalf[j];
            j++;
            k++;
        }
    }
}

const array = [38, 27, 43, 3, 9, 82, 10];
mergeSort(array);
console.log(array);
        `
    }

    getPythonCode(): string {
        return `
def merge_sort(array):
    if len(array) > 1:
        middle = len(array) // 2
        left_half = array[:middle]
        right_half = array[middle:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                array[k] = left_half[i]
                i += 1
            else:
                array[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            array[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            array[k] = right_half[j]
            j += 1
            k += 1

if __name__ == "__main__":
    array = [38, 27, 43, 3, 9, 82, 10]
    merge_sort(array)
    print(array)

        `
    }

    getCCode(): string {
        return `
#include <stdio.h>
#include <stdlib.h>

void merge(int array[], int left, int middle, int right) {
    int n1 = middle - left + 1;
        int n2 = right - middle;

    int* leftArray = (int*)malloc(n1 * sizeof(int));
    int* rightArray = (int*)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++)
        leftArray[i] = array[left + i];
    for (int i = 0; i < n2; i++)
        rightArray[i] = array[middle + 1 + i];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;
    }

    free(leftArray);
    free(rightArray);
}

void mergeSort(int array[], int left, int right) {
    if (left < right) {
        int middle = left + (right - left) / 2;
        mergeSort(array, left, middle);
        mergeSort(array, middle + 1, right);
        merge(array, left, middle, right);
    }
}

int main() {
    int array[] = {38, 27, 43, 3, 9, 82, 10};
    int arraySize = sizeof(array) / sizeof(array[0]);

    mergeSort(array, 0, arraySize - 1);

    printf("Sorted array: \\n");
    for (int i = 0; i < arraySize; i++)
        printf("%d ", array[i]);
    printf("\\n");

    return 0;
}

        `
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted.",
                "array": [38, 27, 43, 3, 9, 82, 10]
            },
            {
                "title": "Divide",
                "description": "Split the array into two halves.",
                "steps": [
                    {
                        "description": "Left Half",
                        "array": [38, 27, 43]
                    },
                    {
                        "description": "Right Half",
                        "array": [3, 9, 82, 10]
                    }
                ]
            },
            {
                "title": "Recursive Sort on Left Half",
                "description": "Apply merge sort recursively on the left half.",
                "steps": [
                    {
                        "description": "Split",
                        "steps": [
                            {
                                "description": "Left Half",
                                "array": [38]
                            },
                            {
                                "description": "Right Half",
                                "array": [27, 43]
                            }
                        ]
                    },
                    {
                        "description": "Recursive Sort on Right Half",
                        "steps": [
                            {
                                "description": "Split",
                                "steps": [
                                    {
                                        "description": "Left Half",
                                        "array": [27]
                                    },
                                    {
                                        "description": "Right Half",
                                        "array": [43]
                                    }
                                ]
                            },
                            {
                                "description": "Merge",
                                "result": [27, 43]
                            }
                        ]
                    },
                    {
                        "description": "Merge",
                        "result": [27, 38, 43]
                    }
                ]
            },
            {
                "title": "Recursive Sort on Right Half",
                "description": "Apply merge sort recursively on the right half.",
                "steps": [
                    {
                        "description": "Split",
                        "steps": [
                            {
                                "description": "Left Half",
                                "array": [3, 9]
                            },
                            {
                                "description": "Right Half",
                                "array": [82, 10]
                            }
                        ]
                    },
                    {
                        "description": "Recursive Sort on Left Half",
                        "steps": [
                            {
                                "description": "Split",
                                "steps": [
                                    {
                                        "description": "Left Half",
                                        "array": [3]
                                    },
                                    {
                                        "description": "Right Half",
                                        "array": [9]
                                    }
                                ]
                            },
                            {
                                "description": "Merge",
                                "result": [3, 9]
                            }
                        ]
                    },
                    {
                        "description": "Recursive Sort on Right Half",
                        "steps": [
                            {
                                "description": "Split",
                                "steps": [
                                    {
                                        "description": "Left Half",
                                        "array": [82]
                                    },
                                    {
                                        "description": "Right Half",
                                        "array": [10]
                                    }
                                ]
                            },
                            {
                                "description": "Merge",
                                "result": [10, 82]
                            }
                        ]
                    },
                    {
                        "description": "Merge",
                        "result": [3, 9, 10, 82]
                    }
                ]
            },
            {
                "title": "Final Merge",
                "description": "Merge the two sorted halves.",
                "result": [3, 9, 10, 27, 38, 43, 82]
            }
        ]
    }
}
