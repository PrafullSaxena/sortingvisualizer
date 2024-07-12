
import { ALGORITHMS } from "../../data/AppContants";
import { Algo } from "../Types";
import { BubbleSort } from "./algos/bubbleSort";
import { HeapSort } from "./algos/heapSort";
import { InsertionSort } from "./algos/insertionSort";
import { MergeSort } from "./algos/mergeSort";
import { QuickSort } from "./algos/quickSort";
import { SelectionSort } from "./algos/selectionSort";
import { ShellSort } from "./algos/shellSort";


class SortingFactory {
    static getAlgo(algoKey: string): Algo {
        console.log("found algokey - ", { algoKey });

        switch (algoKey) {
            case ALGORITHMS.BUBBLE_SORT:
                return new BubbleSort();
            case ALGORITHMS.QUICK_SORT:
                return new QuickSort();
            case ALGORITHMS.INSERTION_SORT:
                return new InsertionSort();
            case ALGORITHMS.MERGE_SORT:
                return new MergeSort();
            case ALGORITHMS.SELECTION_SORT:
                return new SelectionSort();
            case ALGORITHMS.HEAP_SORT:
                return new HeapSort();
            case ALGORITHMS.SHELL_SORT:
                return new ShellSort();
            // case ALGORITHMS.RADIX_SORT:
            //     return new RadixSort();
            default:
                throw new Error('Invalid algorithm key');
        }
    }
}

export default SortingFactory;