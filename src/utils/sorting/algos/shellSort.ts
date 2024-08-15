
import { AppDispatch, store } from "../../../store";
import { updateElements } from "../../../store/slice/elementSlice";
import { changeApplicationState, changePrimaryIndex, changeSecondaryIndex } from "../../../store/slice/stateSlice";
import { APPLICATION_STATE, Algo, LineType, AlgoStepType, Complexity } from "../../Types";


export class ShellSort implements Algo {

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
        let gap = Math.floor(n / 2);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = { ...arr[i] };
                let j = i;

                // Dispatch action to highlight current element (optional for visualization)
                this.dispatch(changePrimaryIndex(i));

                while (j >= gap && arr[j - gap].height > temp.height) {
                    arr[j] = { ...arr[j - gap] };

                    // Dispatch action to update Redux state with visual changes
                    this.dispatch(updateElements([...arr]));

                    // Delay for visualization (adjust as needed)
                    await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));

                    j -= gap;
                }

                arr[j] = { ...temp };

                // Dispatch action to update Redux state with visual changes
                this.dispatch(updateElements([...arr]));

                // Delay for visualization (adjust as needed)
                await new Promise(resolve => setTimeout(resolve, store.getState().settings.speed));
            }
            gap = Math.floor(gap / 2);
        }

        // Sorting finished, dispatch final state update
        this.dispatch(changeApplicationState(APPLICATION_STATE.FINISHED));
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
            best: "O(1)",
            average: "O(1)",
            worst: "O(1)",
        }
    }

    getName(): string {
        return "Shell Sort";
    }

    getDescription(): string {
        return "Shell Sort is an optimization over insertion sort. It starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. The final pass of Shell Sort is a plain insertion sort, but by then, the array of data is guaranteed to be almost sorted.";
    }

    getAlgoSteps(): AlgoStepType[] {
        return [
            {
                "title": "Initial Array",
                "description": "The input array to be sorted using Shell Sort.",
                "array": [10, 7, 8, 9, 1, 5]
            },
            {
                "title": "Shell Sort",
                "description": "Sort the array using Shell Sort.",
                "steps": [
                    {
                        "title": "Gap Sequence Selection",
                        "description": "Select the gap sequence for Shell Sort.",
                        "array": [10, 7, 8, 9, 1, 5]
                    },
                    {
                        "title": "Iteration with Gap h = 3",
                        "description": "Perform insertion sort on elements separated by h.",
                        "steps": [
                            {
                                "title": "Subarray 1",
                                "description": "Elements at positions 0, 3 in array sorted with insertion sort.",
                                "array": [1, 7, 8, 9, 10, 5]
                            },
                            {
                                "title": "Subarray 2",
                                "description": "Elements at positions 1, 4 in array sorted with insertion sort.",
                                "array": [1, 5, 8, 9, 10, 7]
                            },
                            {
                                "title": "Subarray 3",
                                "description": "Elements at positions 2, 5 in array sorted with insertion sort.",
                                "array": [1, 5, 7, 9, 10, 8]
                            }
                        ]
                    },
                    {
                        "title": "Iteration with Gap h = 1",
                        "description": "Perform insertion sort on entire array.",
                        "array": [1, 5, 7, 8, 9, 10]
                    }
                ]
            },
            {
                "title": "Sorted Array",
                "description": "Array after Shell Sort.",
                "array": [1, 5, 7, 8, 9, 10]
            }
        ]
    }

    getJavaCode(): string {
        return `
import java.util.Arrays;

public class ShellSortExample {

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Initial Array: " + Arrays.toString(array));
        shellSort(array);
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public static void shellSort(int[] array) {
        int n = array.length;
        
        // Start with a large gap, then reduce the gap
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // Do a gapped insertion sort for this gap size
            for (int i = gap; i < n; i++) {
                int temp = array[i];
                
                // Shift earlier gapped elements until the correct location is found
                int j;
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                    array[j] = array[j - gap];
                }
                
                // Put temp (the original array[i]) in its correct location
                array[j] = temp;
            }
        }
    }
}
        `

    }

    getJavascriptCode(): string {
        return `
function shellSort(array) {
    console.log("Initial Array: " + array.join(', '));
    
    let n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
        }
    }
    
    console.log("Sorted Array: " + array.join(', '));
}

let array = [10, 7, 8, 9, 1, 5];
shellSort(array);        
        `
    }
    getPythonCode(): string {
        return `
def shell_sort(array):
    print(f"Initial Array: {array}")
    
    n = len(array)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = array[i]
            j = i
            while j >= gap and array[j - gap] > temp:
                array[j] = array[j - gap]
                j -= gap
            array[j] = temp
        gap //= 2
    
    print(f"Sorted Array: {array}")

array = [10, 7, 8, 9, 1, 5]
shell_sort(array)
        `
    }
    getCCode(): string {
        return `
#include <stdio.h>

void printArray(int array[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

void shellSort(int array[], int n) {
    printf("Initial Array: ");
    printArray(array, n);
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = array[i];
            int j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
        }
    }
    
    printf("Sorted Array: ");
    printArray(array, n);
}

int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    
    shellSort(array, n);
    return 0;
}
        `
    }
}