// =================================================================
// 🏦 CHALLENGE 1: ATM BANKING SYSTEM
// =================================================================

// System State (حالة النظام)
let userPIN = "1234";
let currentBalance = 1000.00;
let accountLocked = false;
let incorrectAttempts = 0;

function atmOperation(enteredPIN, operation, amount = 0, newPIN = "") {
    // البونص: التأكد من أن الحساب غير مغلق
    if (accountLocked) {
        console.log("❌ Account locked due to 3 incorrect PIN attempts. Please contact support.");
        return;
    }

    // شرط عملي: التأكد من صحة الـ PIN
    if (enteredPIN !== userPIN) {
        incorrectAttempts++;
        console.log(`❌ Incorrect PIN. Attempt ${incorrectAttempts}/3.`);
        if (incorrectAttempts >= 3) {
            accountLocked = true;
            console.log("🔒 Account has been locked due to security reasons.");
        }
        return;
    }

    // إعادة تصغير محاولات الخطأ عند كتابة الرقم الصحيح
    incorrectAttempts = 0;

    // تنفيذ العمليات
    switch (operation.toLowerCase()) {
        case 'check balance':
            console.log(`💰 Balance Inquiry: Your current balance is $${currentBalance.toFixed(2)}.`);
            break;

        case 'withdraw':
            if (amount <= 0) {
                console.log("❌ Error: Withdrawal amount must be greater than zero.");
            } else if (amount > currentBalance) {
                console.log(`❌ Transaction Declined: Insufficient funds. Available balance: $${currentBalance.toFixed(2)}.`);
            } else {
                currentBalance -= amount;
                console.log(`✅ Success: Withdrew $${amount.toFixed(2)}. New balance: $${currentBalance.toFixed(2)}.`);
            }
            break;

        case 'deposit':
            if (amount <= 0) {
                console.log("❌ Error: Deposit amount must be greater than zero.");
            } else {
                currentBalance += amount;
                console.log(`✅ Success: Deposited $${amount.toFixed(2)}. New balance: $${currentBalance.toFixed(2)}.`);
            }
            break;

        case 'change pin':
            const isFourDigits = /^\d{4}$/.test(newPIN);
            if (!isFourDigits) {
                console.log("❌ Error: New PIN must contain exactly 4 digits.");
            } else {
                userPIN = newPIN;
                console.log("✅ Success: Your PIN has been successfully updated.");
            }
            break;

        default:
            console.log("❌ Error: Invalid operation selected.");
    }
}

// --- تجربة Challenge 1 ---
console.log("--- 🏦 TESTING ATM SYSTEM ---");
atmOperation("1234", "check balance");
atmOperation("1234", "withdraw", 200);
atmOperation("1234", "deposit", 500);
atmOperation("1234", "change pin", 0, "9876");


// =================================================================
// 🛒 CHALLENGE 2: E-COMMERCE CHECKOUT SYSTEM
// =================================================================

function processCheckout(customerName, category, price, quantity, couponCode, paymentMethod) {
    console.log(`\n🧾 --- INVOICE FOR ${customerName.toUpperCase()} ---`);
    
    // 1. حساب المجموع المبدئي
    let subtotal = price * quantity;
    let runningTotal = subtotal;
    console.log(`Subtotal (${quantity} x $${price.toFixed(2)}): $${subtotal.toFixed(2)}`);

    // 2. خصم الفئة (Category Discount)
    let categoryDiscount = 0;
    if (category.toLowerCase() === 'electronics') categoryDiscount = 0.10; // 10%
    else if (category.toLowerCase() === 'clothing') categoryDiscount = 0.15; // 15%
    
    let categoryDiscountAmount = runningTotal * categoryDiscount;
    runningTotal -= categoryDiscountAmount;
    if (categoryDiscountAmount > 0) {
        console.log(`Category Discount (${category}): -$${categoryDiscountAmount.toFixed(2)}`);
    }

    // 3. خصم الكوبون
    let couponDiscountAmount = 0;
    if (couponCode.toUpperCase() === 'SAVE20') {
        couponDiscountAmount = runningTotal * 0.20; // 20%
        runningTotal -= couponDiscountAmount;
        console.log(`Coupon Code (SAVE20): -$${couponDiscountAmount.toFixed(2)}`);
    }

    // 4. خصم طريقة الدفع
    let paymentDiscountAmount = 0;
    if (paymentMethod.toLowerCase() === 'digital wallet') {
        paymentDiscountAmount = runningTotal * 0.05; // 5%
        runningTotal -= paymentDiscountAmount;
        console.log(`Payment Method Discount (Digital Wallet): -$${paymentDiscountAmount.toFixed(2)}`);
    }

    // البونص: لو السعر بقى بالسالب نخليه 0
    if (runningTotal < 0) runningTotal = 0;

    // 5. حساب الضريبة (VAT 14%)
    const VAT_RATE = 0.14;
    let vatAmount = runningTotal * VAT_RATE;
    
    // 6. السعر النهائي
    let finalPrice = runningTotal + vatAmount;

    console.log(`VAT (14%): $${vatAmount.toFixed(2)}`);
    console.log(`-----------------------------------`);
    console.log(`🔥 Total Amount Due: $${finalPrice.toFixed(2)}`);
}

// --- تجربة Challenge 2 ---
console.log("\n--- 🛒 TESTING CHECKOUT SYSTEM ---");
processCheckout("Alice", "Electronics", 1200, 1, "SAVE20", "Digital Wallet");


// =================================================================
// 🎓 CHALLENGE 3: UNIVERSITY STUDENT PORTAL
// =================================================================

function processStudentGrade(studentName, attendance, midterm, finalExam, assignment, tuitionPaid) {
    console.log(`\n🎓 --- ACADEMIC PORTAL: ${studentName.toUpperCase()} ---`);

    const MIN_ATTENDANCE = 75; // نسبة الحضور المطلوبة

    // شرط عملي: مصاريف الجامعة
    if (!tuitionPaid) {
        console.log("❌ Access Denied: Results are withheld due to unpaid tuition.");
        return;
    }

    // شرط عملي: نسبة الحضور
    if (attendance < MIN_ATTENDANCE) {
        console.log(`❌ Status: FAILED (Attendance: ${attendance}% is below required ${MIN_ATTENDANCE}%)`);
        return;
    }

    // حساب المجموع الكلي بناءً على نسب الوزن (Midterm 30%, Final 50%, Assignment 20%)
    let totalScore = (midterm * 0.30) + (finalExam * 0.50) + (assignment * 0.20);
    
    // تحديد التقدير (Letter Grade)
    let letterGrade = "";
    if (totalScore >= 90) letterGrade = "A";
    else if (totalScore >= 80) letterGrade = "B";
    else if (totalScore >= 70) letterGrade = "C";
    else if (totalScore >= 60) letterGrade = "D";
    else letterGrade = "F";

    let status = letterGrade === "F" ? "FAILED" : "PASSED";
    console.log(`Total Weighted Score: ${totalScore.toFixed(2)}/100`);
    console.log(`Letter Grade: ${letterGrade}`);
    console.log(`Academic Status: ${status}`);

    // البونص: منحة المتفوقين
    if (letterGrade === "A" && attendance >= 95) {
        console.log("🌟 Congratulations! You are eligible for the President's Honor Scholarship.");
    }
}

// --- تجربة Challenge 3 ---
console.log("\n--- 🎓 TESTING STUDENT PORTAL ---");
processStudentGrade("Alex Reed", 98, 95, 96, 95, true);


// =================================================================
// 💻 LEETCODE PRACTICE
// =================================================================

// Problem 1: Valid Parentheses (الأقواس الصحيحة)
function isValid(s) {
    const stack = [];
    const bracketMap = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        if (char in bracketMap) {
            const topElement = stack.length > 0 ? stack.pop() : '#';
            if (bracketMap[char] !== topElement) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

// Problem 2: Find the Index of the First Occurrence in a String
function strStr(haystack, needle) {
    if (needle === "") return 0;
    let hLen = haystack.length;
    let nLen = needle.length;

    for (let i = 0; i <= hLen - nLen; i++) {
        let j = 0;
        while (j < nLen && haystack[i + j] === needle[j]) j++;
        if (j === nLen) return i;
    }
    return -1;
}

// --- تجربة مسائل LeetCode ---
console.log("\n--- 💻 TESTING LEETCODE PROBLEMS ---");
console.log("LeetCode 1 (Valid Parentheses):", isValid("()[]{}")); // المتوقع: true
console.log("LeetCode 2 (First Occurrence):", strStr("sadbutsad", "sad")); // المتوقع: 0