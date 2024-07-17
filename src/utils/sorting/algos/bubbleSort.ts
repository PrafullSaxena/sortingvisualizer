import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, AlgoStepType, Complexity, LineType } from "../../Types";



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

    getTimeComplexity(): Complexity {
        return {
            best: "O(n)",
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
        return "Bubble Sort";
    }

    getDescription(): string {
        return "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Swap 10 and 7",
                "description": "Swapping 10 and 7",
                "array": [7, 10, 8, 9, 1, 5]
            },
            {
                "title": "Swap 10 and 8",
                "description": "Swapping 10 and 8",
                "array": [7, 8, 10, 9, 1, 5]
            },
            {
                "title": "Swap 10 and 9",
                "description": "Swapping 10 and 9",
                "array": [7, 8, 9, 10, 1, 5]
            },
            {
                "title": "Swap 10 and 1",
                "description": "Swapping 10 and 1",
                "array": [7, 8, 9, 1, 10, 5]
            },
            {
                "title": "Swap 10 and 5",
                "description": "Swapping 10 and 5",
                "array": [7, 8, 9, 1, 5, 10]
            },
            {
                "title": "Swap 9 and 1",
                "description": "Swapping 9 and 1",
                "array": [7, 8, 1, 9, 5, 10]
            },
            {
                "title": "Swap 9 and 5",
                "description": "Swapping 9 and 5",
                "array": [7, 8, 1, 5, 9, 10]
            },
            {
                "title": "Swap 8 and 1",
                "description": "Swapping 8 and 1",
                "array": [7, 1, 8, 5, 9, 10]
            },
            {
                "title": "Swap 8 and 5",
                "description": "Swapping 8 and 5",
                "array": [7, 1, 5, 8, 9, 10]
            },
            {
                "title": "Swap 7 and 1",
                "description": "Swapping 7 and 1",
                "array": [1, 7, 5, 8, 9, 10]
            },
            {
                "title": "Swap 7 and 5",
                "description": "Swapping 7 and 5",
                "array": [1, 5, 7, 8, 9, 10]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Bubble Sort.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ]
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class BubbleSortExample {

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Initial Array: " + Arrays.toString(array));
        bubbleSort(array);
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public static void bubbleSort(int[] array) {
        int n = array.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // swap array[j] and array[j+1]
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no two elements were swapped in the inner loop, then break
            if (!swapped) {
                break;
            }
        }
    }
}        
        `;
    }

    getJavascriptCode(): string {
        return `function bubbleSort(array) {
    console.log("Initial Array: " + array.join(', '));
    
    let n = array.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // swap array[j] and array[j+1]
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
        // If no two elements were swapped in the inner loop, then break
        if (!swapped) {
            break;
        }
    }
    
    console.log("Sorted Array: " + array.join(', '));
}

let array = [10, 7, 8, 9, 1, 5];
bubbleSort(array);`;
    }

    getPythonCode(): string {
        return `def bubble_sort(array):
    print(f"Initial Array: {array}")
    
    n = len(array)
    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if array[j] > array[j + 1]:
                # swap array[j] and array[j+1]
                array[j], array[j + 1] = array[j + 1], array[j]
                swapped = True
        # If no elements were swapped in the inner loop, then break
        if not swapped:
            break
    
    print(f"Sorted Array: {array}")

array = [10, 7, 8, 9, 1, 5]
bubble_sort(array)`;
    }

    getCCode(): string {
        return `#include <stdio.h>

void bubbleSort(int array[], int n) {
    printf("Initial Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");
    
    int i, j;
    for (i = 0; i < n - 1; i++) {
        int swapped = 0; // Flag to check if any swapping happened in the inner loop
        for (j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // swap array[j] and array[j+1]
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = 1; // Set swapped to true
            }
        }
        // If no elements were swapped in the inner loop, then break
        if (swapped == 0) {
            break;
        }
    }
    
    printf("Sorted Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");
}

int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    bubbleSort(array, n);
    return 0;
}`;
    }
}
