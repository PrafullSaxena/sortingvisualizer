import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType, AlgoStepType, Complexity } from "../../Types";

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
        }
    }

    getName(): string {
        return "Insertion Sort";
    }

    getDescription(): string {
        return "Insertion Sort is an in-place comparison-based sorting algorithm. It builds the final sorted array one item at a time, with each iteration moving an element to its appropriate position.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Insertion Sort",
                "description": "Sort the array using insertion sort.",
                "steps": [
                    {
                        "title": "Iteration 1",
                        "description": "Insert 7 into its correct position.",
                        "array": [7, 10, 8, 9, 1, 5]
                    },
                    {
                        "title": "Iteration 2",
                        "description": "Insert 8 into its correct position.",
                        "array": [7, 8, 10, 9, 1, 5]
                    },
                    {
                        "title": "Iteration 3",
                        "description": "Insert 9 into its correct position.",
                        "array": [7, 8, 9, 10, 1, 5]
                    },
                    {
                        "title": "Iteration 4",
                        "description": "Insert 1 into its correct position.",
                        "array": [1, 7, 8, 9, 10, 5]
                    },
                    {
                        "title": "Iteration 5",
                        "description": "Insert 5 into its correct position.",
                        "array": [1, 5, 7, 8, 9, 10]
                    }
                ]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Insertion Sort.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ]
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class InsertionSortExample {

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Initial Array: " + Arrays.toString(array));
        insertionSort(array);
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public static void insertionSort(int[] array) {
        int n = array.length;
        for (int i = 1; i < n; ++i) {
            int key = array[i];
            int j = i - 1;

            // Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
    }
}
        `;
    }

    getJavascriptCode(): string {
        return `
function insertionSort(array) {
    console.log("Initial Array: " + array.join(', '));
    
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        // Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
    
    console.log("Sorted Array: " + array.join(', '));
}

let array = [10, 7, 8, 9, 1, 5];
insertionSort(array);
`;
    }

    getPythonCode(): string {
        return `
def insertion_sort(array):
    print(f"Initial Array: {array}")
    
    n = len(array)
    for i in range(1, n):
        key = array[i]
        j = i - 1
        
        # Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
        while j >= 0 and array[j] > key:
            array[j + 1] = array[j]
            j -= 1
        array[j + 1] = key
    
    print(f"Sorted Array: {array}")

array = [10, 7, 8, 9, 1, 5]
insertion_sort(array)

        `;
    }

    getCCode(): string {
        return `
#include <stdio.h>

void insertionSort(int array[], int n) {
    printf("Initial Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
    
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = array[i];
        j = i - 1;
        
        // Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
    
    printf("Sorted Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    
    insertionSort(array, n);
    
    return 0;
}

        `
    }
}
