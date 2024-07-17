import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType, AlgoStepType, Complexity } from "../../Types";


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

    getTimeComplexity(): Complexity {
        return {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n^2)",
        };
    }

    getSpaceComplexity(): Complexity {
        return {
            best: "O(log n)",
            average: "O(log n)",
            worst: "O(n)",
        };
    }

    getName(): string {
        return "Quick Sort";
    }

    getDescription(): string {
        return "Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Choose Pivot",
                "description": "Select a pivot element from the array.",
                "steps": [
                    {
                        "description": "Pivot Element",
                        "array": [10, 7, 8, 9, 1, 5],
                        "result": [5]  // Pivot is the last element
                    }
                ]
            },
            {
                "title": "Partition",
                "description": "Rearrange elements such that elements less than pivot are on the left and elements greater than pivot are on the right.",
                "steps": [
                    {
                        "description": "Partitioning Array",
                        "array": [10, 7, 8, 9, 1, 5],
                        "result": [1, 5, 8, 9, 10, 7]  // Example partition step
                    }
                ]
            },
            {
                "title": "Recursive Sort on Left Sub-Array",
                "description": "Apply quick sort recursively on the left sub-array.",
                "steps": [
                    {
                        "description": "Left Sub-Array",
                        "array": [1],
                        "result": [1]  // Base case, already sorted
                    }
                ]
            },
            {
                "title": "Recursive Sort on Right Sub-Array",
                "description": "Apply quick sort recursively on the right sub-array.",
                "steps": [
                    {
                        "description": "Choose Pivot",
                        "steps": [
                            {
                                "description": "Pivot Element",
                                "array": [8, 9, 10, 7],
                                "result": [7]  // Pivot is the last element
                            }
                        ]
                    },
                    {
                        "description": "Partition",
                        "steps": [
                            {
                                "description": "Partitioning Array",
                                "array": [8, 9, 10, 7],
                                "result": [7, 8, 9, 10]  // Example partition step
                            }
                        ]
                    },
                    {
                        "description": "Recursive Sort on Left Sub-Array",
                        "steps": [
                            {
                                "description": "Left Sub-Array",
                                "array": [7],
                                "result": [7]  // Base case, already sorted
                            }
                        ]
                    },
                    {
                        "description": "Recursive Sort on Right Sub-Array",
                        "steps": [
                            {
                                "description": "Right Sub-Array",
                                "array": [8, 9, 10],
                                "result": [8, 9, 10]  // Example of sorted sub-array
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Combine Sorted Sub-Arrays",
                "description": "Combine the sorted left sub-array, pivot, and sorted right sub-array.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ];
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class QuickSort {
    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        quickSort(array, 0, array.length - 1);
        System.out.println(Arrays.toString(array));
    }

    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);

            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }

    public static int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        return i + 1;
    }
}        
        `
    }

    getJavascriptCode(): string {
        return `
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    } else {
        const pivot = array[Math.floor(array.length / 2)];
        const left = array.filter(x => x < pivot);
        const middle = array.filter(x => x === pivot);
        const right = array.filter(x => x > pivot);
        return [...quickSort(left), ...middle, ...quickSort(right)];
    }
}

const array = [10, 7, 8, 9, 1, 5];
const sortedArray = quickSort(array);
console.log(sortedArray);
}`;
    }

    getPythonCode(): string {
        return `
def quick_sort(array):
    if len(array) <= 1:
        return array
    else:
        pivot = array[len(array) // 2]
        left = [x for x in array if x < pivot]
        middle = [x for x in array if x == pivot]
        right = [x for x in array if x > pivot]
        return quick_sort(left) + middle + quick_sort(right)

if __name__ == "__main__":
    array = [10, 7, 8, 9, 1, 5]
    sorted_array = quick_sort(array)
    print(sorted_array)
        `
    }

    getCCode(): string {
        return `
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int array[], int low, int high) {
    int pivot = array[high];
    int i = (low - 1);

    for (int j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i++;
            swap(&array[i], &array[j]);
        }
    }
    swap(&array[i + 1], &array[high]);
    return (i + 1);
}

void quickSort(int array[], int low, int high) {
    if (low < high) {
        int pi = partition(array, low, high);

        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
}

int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    quickSort(array, 0, n - 1);
    printf("Sorted array: \\n");
    for (int i = 0; i < n; i++)
        printf("%d ", array[i]);
    printf("\\n");
    return 0;
}
        
`;
    }
}
