// =================================================================
// 🧾 SECTION 1: MINI PROJECTS
// =================================================================

// --- 🛒 Project 1: Online Store Order Processing System ---

function processOrders(orders) {
    let totalRevenue = 0;
    let successfulOrders = 0;
    let processedCount = 0;
    
    let consecutiveSkips = 0; 
    let totalStockFailures = 0; 
    let stopMessage = "";

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        processedCount++; 

        let isCancelledOrInvalid = order.status === "cancelled" || order.status === "invalid";
        let isStockMissing = !order.stockAvailable;

        if (isCancelledOrInvalid || isStockMissing) {
            consecutiveSkips++; 
            
            if (isStockMissing) {
                totalStockFailures++;
            }

            if (consecutiveSkips >= 3 || totalStockFailures >= 3) {
                stopMessage = "System stopped due to critical failure";
                break; 
            }

            continue; 
        } else {
            totalRevenue += order.amount; 
            successfulOrders++; 
            consecutiveSkips = 0; 
        }
    }

    let result = {
        totalRevenue: totalRevenue,
        successfulOrders: successfulOrders,
        processedOrdersCount: processedCount
    };

    if (stopMessage !== "") {
        result.stopMessage = stopMessage;
    }

    return result;
}

// --- Test Case for Project 1 ---
const myOrders = [
    { id: 1, status: "valid", stockAvailable: true, amount: 100 },
    { id: 2, status: "valid", stockAvailable: true, amount: 200 },
    { id: 3, status: "cancelled", stockAvailable: true, amount: 50 },  
    { id: 4, status: "valid", stockAvailable: false, amount: 150 }, 
    { id: 5, status: "invalid", stockAvailable: true, amount: 300 },  
    { id: 6, status: "valid", stockAvailable: true, amount: 400 }   
];

console.log("--- 🛒 ORDER SYSTEM RESULT ---");
console.log(processOrders(myOrders));


// =================================================================
// 💻 SECTION 2: CODING PROBLEMS
// =================================================================

// --- 1️⃣ Check if Array is Sorted ---
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false; 
        }
    }
    return true; 
}

console.log("\n--- 1️⃣ CHECK IF SORTED ---");
console.log("Is [1, 2, 3, 5] sorted?", isSorted([1, 2, 3, 5])); 
console.log("Is [1, 5, 3, 4] sorted?", isSorted([1, 5, 3, 4])); 


// --- 2️⃣ Return Numbers Greater Than a Value ---
function getNumbersGreaterThan(arr, value) {
    let result = []; 
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > value) {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log("\n--- 2️⃣ NUMBERS GREATER THAN VALUE ---");
console.log("Numbers greater than 5:", getNumbersGreaterThan([2, 8, 4, 10, 5, 7], 5));