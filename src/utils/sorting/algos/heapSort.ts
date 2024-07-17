import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, AlgoStepType, Complexity, LineType } from "../../Types";

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

    getTimeComplexity(): Complexity {
        return {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
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
        return "Heap Sort";
    }

    getDescription(): string {
        return "Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Build Max Heap",
                "description": "Build a max heap from the input array.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Heapify",
                "description": "Heapify the heap to maintain max heap property.",
                "steps": [
                    {
                        "title": "Heapify at Index 1",
                        "array": [10, 7, 8, 9, 1, 5]
                    },
                    {
                        "title": "Heapify at Index 0",
                        "array": [10, 9, 8, 7, 1, 5]
                    }
                ]
            },
            {
                "title": "Extract Max",
                "description": "Extract the maximum element from the heap.",
                "array": [9, 7, 8, 5, 1, 10]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Heap Sort.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ]
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class HeapSortExample {

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Initial Array: " + Arrays.toString(array));
        heapSort(array);
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public static void heapSort(int[] array) {
        int n = array.length;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(array, n, i);
        }

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = array[0];
            array[0] = array[i];
            array[i] = temp;

            // call max heapify on the reduced heap
            heapify(array, i, 0);
        }
    }

    public static void heapify(int[] array, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1; // left = 2*i + 1
        int right = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            int swap = array[i];
            array[i] = array[largest];
            array[largest] = swap;

            // Recursively heapify the affected sub-tree
            heapify(array, n, largest);
        }
    }
}
        `
    }

    getJavascriptCode(): string {
        return `
function heapSort(array) {
    console.log("Initial Array: " + array.join(', '));
    
    let n = array.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // call max heapify on the reduced heap
        heapify(array, i, 0);
    }
    
    console.log("Sorted Array: " + array.join(', '));
}

function heapify(array, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        let temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest);
    }
}

let array = [10, 7, 8, 9, 1, 5];
heapSort(array);        
        `
    }
    getPythonCode(): string {
        return `
def heap_sort(array):
    print(f"Initial Array: {array}")
    
    n = len(array)

    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(array, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        array[i], array[0] = array[0], array[i]  # swap
        heapify(array, i, 0)
    
    print(f"Sorted Array: {array}")

def heapify(array, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child exists and is greater than the root
    if left < n and array[left] > array[largest]:
        largest = left

    # Check if right child exists and is greater than the root
    if right < n and array[right] > array[largest]:
        largest = right

    # Change root if needed
    if largest != i:
        array[i], array[largest] = array[largest], array[i]  # swap
        heapify(array, n, largest)

array = [10, 7, 8, 9, 1, 5]
heap_sort(array)
        `
    }
    getCCode(): string {
        return `
#include <stdio.h>

// Function to heapify a subtree rooted with node i which is an index in array[]
void heapify(int array[], int n, int i) {
    int largest = i;    // Initialize largest as root
    int left = 2 * i + 1;    // left = 2*i + 1
    int right = 2 * i + 2;    // right = 2*i + 2

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest != i) {
        int temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest);
    }
}

// Main function to do heap sort
void heapSort(int array[], int n) {
    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // call max heapify on the reduced heap
        heapify(array, i, 0);
    }
}

// Function to print an array
void printArray(int array[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");
}

// Driver program to test above functions
int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    
    printf("Initial Array: ");
    printArray(array, n);
    
    heapSort(array, n);
    
    printf("Sorted Array: ");
    printArray(array, n);
    
    return 0;
}
        `
    }


}