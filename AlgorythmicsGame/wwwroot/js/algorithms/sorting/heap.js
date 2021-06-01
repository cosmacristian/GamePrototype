(function ($) {

    function displayLimits(array, arrayName, pointer, pointerName, pointerValue, limitType) {
        console.log("LIMIT: The pointer of " + arrayName + ": " + pointerName + " has " + limitType + "limit: " + pointerValue);
    }

    function iterate(array, arrayName, pointer, pointerName, value) {
        var newValue = pointer + value;
        console.log("ITERATE: Iterate pointer: " + name + "of array: " + arrayName + " with: " + value + "-> " + newValue);
    }

    function compare(array1, array1Name, array2, array2Name, pointer1, pointer1Name, pointer2, pointer2Name) {
        console.log("COMPARE: Comparison of elements: " + array1Name + "[" + pointer1Name + "]= ", array1[pointer1] + ", " + array2Name + "[" + pointer2Name + "]= " + array2[pointer2]);
    }

    function choose(array1, array1Name, pointer1, pointer1Name, array2, array2Name, pointer2, pointer2Name) {
        console.log("CHOOSE: Choosing the smaller element from previous comparison, which is: " + arrayName + "[" + pointerName + "]=" + array[pointer] + ". New position: " + array2Name + "[" + pointer2Name + "]");
    }

    function swap(array, arrayName, position1Name, position1, position2Name, position2) {
        var aux = array[position1];
        array[position1] = array[position2];
        array[position2] = aux;
        console.log("SWAP: Swapping two elements of array " + arrayName + ": " + arrayName + "[" + position1Name + "]= " + array[position1] + "and " + arrayName + "[" + position2Name + "]= " + array[position2]);
    }

    function heapify(array, lenght, i) {

        var largest = i;
        var left = 2 * i + 1;
        var right = 2 * i + 2;

        iterate(array, "array", left, "left", 0);
        iterate(array, "array", right, "right", 0);
        iterate(array, "array", largest, "largest", 0);

        if (left < lenght && array[left] < array[largest]) {
            compare(array, "array", array, "array", left, "left", largest, "largest");
            largest = left;
            iterate(array, "array", largest, "largest", 0);

        }

        if (right < length && array[right] < array[largest]) {
            compare(array, "array", array, "array", right, "right", largest, "largest");
            largest = right;
            iterate(array, "array", largest, "largest", 0);

        }

        if (largest !== i) {
            swap(array, "array", "i", i, "largest", largest);
            heapify(array, lenght, largest);
        }
    }

    function heapSort(array, length) {

        for (var i= length / 2 - 1; i >= 0; i--){
            heapify(array, length, i);
        }

        displayLimits(array, "array", i, "i", length - 1, "START");
        displayLimits(array, "array", i, "i", 0, "END"); 

        for (i = length - 1; i >= 0; i--) {
            swap(array, "array", "0", 0, "i", i);
            heapify(array, i, 0);
        }
    }
})(jQuery);