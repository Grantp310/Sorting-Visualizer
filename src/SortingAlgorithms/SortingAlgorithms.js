export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    l,
    r,
    auxiliaryArray,
    animations
) {
    if (l === r) return;
    const mid = Math.floor((l + r) / 2);
    mergeSortHelper(auxiliaryArray, l, mid, mainArray, animations);
    mergeSortHelper(auxiliaryArray, mid + 1, r, mainArray, animations);
    doMerge(mainArray, l, mid, r, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    l,
    mid,
    r,
    auxiliaryArray,
    animations
) {
    let k = l;
    let i = l;
    let j = mid + 1;
    while (i <= mid && j <= r) {
        animations.push({ indices: [i, j], type: "compare" });
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // animations.push([k, auxiliaryArray[i]]);
            animations.push({ indices: [k, auxiliaryArray[i]], type: "insert" });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // animations.push([k, auxiliaryArray[j]]);
            animations.push({ indices: [k, auxiliaryArray[j]], type: "insert" });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= mid) {

        animations.push({ indices: [i, i], type: "compare" });
        // animations.push([k, auxiliaryArray[i]]);
        animations.push({ indices: [k, auxiliaryArray[i]], type: "insert" });

        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= r) {
        animations.push({ indices: [j, j], type: "compare" });
        // animations.push([k, auxiliaryArray[j]]);
        animations.push({ indices: [k, auxiliaryArray[j]], type: "insert" });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function bubbleSort(array) {
    const animations = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            animations.push({ indices: [i - 1, i], type: "compare" });
            if (array[i] < array[i - 1]) {
                swapped = true;
                [array[i], array[i - 1]] = [array[i - 1], array[i]];
                animations.push({ indices: [i - 1, i], type: "swap" });
            }
        }
    } while (swapped);
    return animations;
}

export function heapSort(array) {
    const N = array.length;
    const animations = [];

    // Build initial heap
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(array, animations, i, N);
        console.log(i)
    }

    // Extract elements from heap in sorted order
    for (let i = N - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        animations.push({ indices: [0, i], type: "swap" });

        heapify(array, animations, 0, i);
    }

    return animations;
}

function heapify(array, animations, i, n) {
    var largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n) {
        animations.push({ indices: [i, l], type: "compare" });
        if (array[l] > array[largest]) {
            largest = l;
        }
    }

    if (r < n) {
        animations.push({ indices: [i, r], type: "compare" });
        if (array[r] > array[largest]) {
            largest = r;
        }
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        animations.push({ indices: [i, largest], type: "swap" });
        heapify(array, animations, largest, n);
    }
}

export function quickSort(array) {
    const animations = [];
    quickSortHelper(array, animations, 0, array.length - 1);
    return animations;
}

function quickSortHelper(array, animations, first, last) {
    if (first >= last) {
        return;
    }

    let l = first;
    let r = last;
    let mid = Math.floor((r - l) / 2) + l;

    // Use median of three technique to choose pivot
    animations.push({ indices: [l, r], type: "compare" });
    if (array[l] > array[r]) {
        [array[l], array[r]] = [array[r], array[l]];
        animations.push({ indices: [l, r], type: "swap" });
    }
    animations.push({ indices: [l, mid], type: "compare" });
    if (array[l] > array[mid]) {
        [array[l], array[mid]] = [array[mid], array[l]];
        animations.push({ indices: [l, mid], type: "swap" });
    }
    animations.push({ indices: [mid, r], type: "compare" });
    if (array[mid] > array[r]) {
        [array[mid], array[r]] = [array[r], array[mid]];
        animations.push({ indices: [mid, r], type: "swap" });
    }

    let pivot = array[mid];
    l++;
    r--;

    while (l <= r) {

        while (l <= r && array[l] < pivot) {
            animations.push({ indices: [l, mid], type: "compare" });
            l++;
        }
        while (l <= r && array[r] > pivot) {
            animations.push({ indices: [r, mid], type: "compare" });
            r--;
        }

        if (l <= r) {
            [array[l], array[r]] = [array[r], array[l]];
            animations.push({ indices: [l, r], type: "swap" });
            l++;
            r--;
        }
    }
    quickSortHelper(array, animations, first, l - 1);
    quickSortHelper(array, animations, l, last);
}

// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// // QuickSort from online
// // Feel free to comment out
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// function partition(arr, low, high) {
//     let pivot = arr[high];
//     let i = low - 1;

//     for (let j = low; j <= high - 1; j++) {
//         // If current element is smaller than the pivot 
//         if (arr[j] < pivot) {
//             // Increment index of smaller element 
//             i++;
//             // Swap elements 
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//         }
//     }
//     // Swap pivot to its correct position 
//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
//     return i + 1; // Return the partition index 
// }

// function quickSort(arr, low, high) {
//     if (low >= high) return;
//     let pi = partition(arr, low, high);

//     quickSort(arr, low, pi - 1);
//     quickSort(arr, pi + 1, high);
// }