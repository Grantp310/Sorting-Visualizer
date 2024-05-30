export function getMergeSortAnimations(array) {
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
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= r) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}