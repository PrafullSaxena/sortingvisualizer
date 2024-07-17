import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType, AlgoStepType, Complexity } from "../../Types";


// TODO: This algorithm is not yet implemented in the UI

export class RadixSort implements Algo {

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
        const max = this.getMax(arr);

        // Perform counting sort for every digit. Note that instead of passing digit number, 
        // exp is passed. exp is 10^i where i is the current digit number being processed.
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await this.countSort(arr, exp);
        }

        // Sorting finished, dispatch final state update
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
    }

    getMax(arr: LineType[]): number {
        let max = arr[0].height;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].height > max) {
                max = arr[i].height;
            }
        }
        return max;
    }

    async countSort(arr: LineType[], exp: number): Promise<void> {
        const n = arr.length;
        const output: LineType[] = new Array(n);
        const count: number[] = new Array(10).fill(0);

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            const index = Math.floor(arr[i].height / exp) % 10;
            count[index]++;
        }

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            const index = Math.floor(arr[i].height / exp) % 10;
            output[count[index] - 1] = { ...arr[i] };
            count[index]--;

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...output]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers according to current digit
        for (let i = 0; i < n; i++) {
            arr[i] = { ...output[i] };

            // Dispatch action to update Redux state with visual changes
            this.dispatch(updateElements([...arr]));

            // Delay for visualization (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
        }
    }

    getTimeComplexity(): Complexity {
        return {
            best: "O(nk)",
            average: "O(nk)",
            worst: "O(nk)",
        };
    }

    getSpaceComplexity(): Complexity {
        return {
            best: "O(n + k)",
            average: "O(n + k)",
            worst: "O(n + k)",
        }
    }

    getName(): string {
        return "Radix Sort";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted using Radix Sort.",
                "array": [170, 45, 75, 90, 802, 24, 2, 66]
            },
            {
                "title": "Radix Sort (Least Significant Digit)",
                "description": "Sort the array using Radix Sort based on the least significant digit (1s place).",
                "steps": [
                    {
                        "title": "Bucket 0",
                        "description": "Numbers with 0 in the least significant digit.",
                        "array": [170, 90, 802]
                    },
                    {
                        "title": "Bucket 1",
                        "description": "Numbers with 1 in the least significant digit.",
                        "array": [801, 1]
                    },
                    {
                        "title": "Bucket 2",
                        "description": "Numbers with 2 in the least significant digit.",
                        "array": [802, 2]
                    },
                    {
                        "title": "Bucket 4",
                        "description": "Numbers with 4 in the least significant digit.",
                        "array": [24]
                    },
                    {
                        "title": "Bucket 5",
                        "description": "Numbers with 5 in the least significant digit.",
                        "array": [45, 75]
                    },
                    {
                        "title": "Bucket 6",
                        "description": "Numbers with 6 in the least significant digit.",
                        "array": [66]
                    }
                ]
            },
            {
                "title": "Radix Sort (Next Significant Digit)",
                "description": "Sort the array using Radix Sort based on the next significant digit (10s place).",
                "steps": [
                    {
                        "title": "Bucket 0",
                        "description": "Numbers with 0 in the tens place.",
                        "array": [170, 802, 24, 1]
                    },
                    {
                        "title": "Bucket 1",
                        "description": "Numbers with 1 in the tens place.",
                        "array": [801]
                    },
                    {
                        "title": "Bucket 2",
                        "description": "Numbers with 2 in the tens place.",
                        "array": [2]
                    },
                    {
                        "title": "Bucket 4",
                        "description": "Numbers with 4 in the tens place.",
                        "array": [24]
                    },
                    {
                        "title": "Bucket 5",
                        "description": "Numbers with 5 in the tens place.",
                        "array": [45]
                    },
                    {
                        "title": "Bucket 6",
                        "description": "Numbers with 6 in the tens place.",
                        "array": [66]
                    },
                    {
                        "title": "Bucket 7",
                        "description": "Numbers with 7 in the tens place.",
                        "array": [75]
                    },
                    {
                        "title": "Bucket 9",
                        "description": "Numbers with 9 in the tens place.",
                        "array": [90]
                    }
                ]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Radix Sort.",
                "array": [1, 2, 24, 45, 66, 75, 90, 170, 802]
            }
        ]
    }

    getDescription(): string {
        return "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value.";
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class RadixSortExample {

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Initial Array: " + Arrays.toString(array));
        radixSort(array);
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public static void radixSort(int[] array) {
        int max = Arrays.stream(array).max().getAsInt();
        
        // Do counting sort for every digit. Note that instead of passing digit number, exp is passed.
        // exp is 10^i where i is the current digit number
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSort(array, exp);
        }
    }

    public static void countingSort(int[] array, int exp) {
        int n = array.length;
        int[] output = new int[n];
        int[] count = new int[10];
        Arrays.fill(count, 0);

        // Store count of occurrences in count[]
        for (int i = 0; i < n; i++) {
            count[(array[i] / exp) % 10]++;
        }

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[(array[i] / exp) % 10] - 1] = array[i];
            count[(array[i] / exp) % 10]--;
        }

        // Copy the output array to array[], so that array[] contains sorted numbers according to current digit
        for (int i = 0; i < n; i++) {
            array[i] = output[i];
        }
    }
}        
        `
    }

    getJavascriptCode(): string {
        return `
function radixSort(array) {
    console.log("Initial Array: " + array.join(', '));
    
    const getMax = (array) => {
        return Math.max(...array);
    };
    
    const countingSort = (array, exp) => {
        const n = array.length;
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);
        
        for (let i = 0; i < n; i++) {
            count[Math.floor(array[i] / exp) % 10]++;
        }
        
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
            count[Math.floor(array[i] / exp) % 10]--;
        }
        
        for (let i = 0; i < n; i++) {
            array[i] = output[i];
        }
    };
    
    const radixSortHelper = (array) => {
        const max = getMax(array);
        
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSort(array, exp);
        }
    };
    
    radixSortHelper(array);
    
    console.log("Sorted Array: " + array.join(', '));
}

let array = [10, 7, 8, 9, 1, 5];
radixSort(array);        
        `
    }
    getPythonCode(): string {
        return `
def radix_sort(array):
    print(f"Initial Array: {array}")
    
    def counting_sort(array, exp):
        n = len(array)
        output = [0] * n
        count = [0] * 10
        
        for i in range(n):
            index = (array[i] // exp) % 10
            count[index] += 1
        
        for i in range(1, 10):
            count[i] += count[i - 1]
        
        i = n - 1
        while i >= 0:
            index = (array[i] // exp) % 10
            output[count[index] - 1] = array[i]
            count[index] -= 1
            i -= 1
        
        for i in range(n):
            array[i] = output[i]
    
    def radix_sort_helper(array):
        max_value = max(array)
        exp = 1
        while max_value // exp > 0:
            counting_sort(array, exp)
            exp *= 10
    
    radix_sort_helper(array)
    
    print(f"Sorted Array: {array}")

array = [10, 7, 8, 9, 1, 5]
radix_sort(array)
        `
    }
    getCCode(): string {
        return `
#include <stdio.h>

// Function to get the maximum value in array
int getMax(int array[], int n) {
    int max = array[0];
    for (int i = 1; i < n; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

// Function to do counting sort based on digit represented by exp
void countingSort(int array[], int n, int exp) {
    int output[n]; // Output array
    int count[10] = {0}; // Initialize count array with zeros

    // Store count of occurrences in count[]
    for (int i = 0; i < n; i++) {
        count[(array[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(array[i] / exp) % 10] - 1] = array[i];
        count[(array[i] / exp) % 10]--;
    }

    // Copy the output array to array[], so that array[] contains sorted numbers according to current digit
    for (int i = 0; i < n; i++) {
        array[i] = output[i];
    }
}

// Main function to implement radix sort
void radixSort(int array[], int n) {
    // Find the maximum number to know number of digits
    int max = getMax(array, n);

    // Do counting sort for every digit. Note that instead of passing digit number, exp is passed.
    // exp is 10^i where i is the current digit number
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSort(array, n, exp);
    }
}

// Function to print an array
void printArray(int array[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

// Driver program to test above functions
int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array)/sizeof(array[0]);
    
    printf("Initial Array: ");
    printArray(array, n);
    
    radixSort(array, n);
    
    printf("Sorted Array: ");
    printArray(array, n);
    
    return 0;
}
        `
    }

}