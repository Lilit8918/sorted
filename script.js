const inputField = document.getElementById("numberInput");
const sortButton = document.getElementById("sortButton");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById("errorMessage");
const outputMessage = document.getElementById("outputMessage");


const cache = {};


function bubbleSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

function insertionSortFun(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

function showError(message) {
    errorMessage.textContent = message;
    outputMessage.textContent = "";
}

function showOutput(numbers) {
    errorMessage.textContent = "";
    outputMessage.textContent = numbers.length ? `Sorted Numbers: ${numbers.join(", ")}` : "No numbers to sort.";
}

function sortNumbers() {
    const input = inputField.value.trim();
    if (!input) {
        return showError("Please enter valid numbers separated by commas or spaces.");
    }

  
    const numberArray = input.split(",")
                             .flatMap(part => part.trim().split(" "))
                             .filter(num => num !== '');

 
    if (!numberArray.every(item => !isNaN(item))) {
        return showError("Please enter valid numbers separated by commas or spaces.");
    }

   
    const numbers = numberArray.map(Number);

  
    const cacheKey = input + ":" + document.querySelector('input[name="sortAlgorithm"]:checked').id;
    if (cache[cacheKey]) {
        showOutput(cache[cacheKey]); 
        return;
    }

    let sortedNumbers;
    const selectedAlgorithm = document.querySelector('input[name="sortAlgorithm"]:checked').id;
    
    if (selectedAlgorithm === "bubbleSort") {
        sortedNumbers = bubbleSortFun(numbers);
    } else if (selectedAlgorithm === "selectionSort") {
        sortedNumbers = selectionSortFun(numbers);
    } else {
        sortedNumbers = insertionSortFun(numbers);
    }

   
    cache[cacheKey] = sortedNumbers;

    showOutput(sortedNumbers);
}


function resetFields() {
    inputField.value = "";  
    errorMessage.textContent = "";  
    outputMessage.textContent = "";  
}

sortButton.addEventListener("click", sortNumbers);
resetButton.addEventListener("click", resetFields);  
